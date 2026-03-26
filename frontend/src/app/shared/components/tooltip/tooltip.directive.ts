import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

const GAP = 8;
const VIEWPORT_PADDING = 8;
const ANIMATION_MS = 150;

// Design System Tokens — valores de shared/styles/_variables.scss
// Hardcoded porque tooltip é criado via Renderer2 no body (sem acesso a SCSS)
const TOOLTIP_BG = '#111827';      // $text-primary
const TOOLTIP_TEXT = '#ffffff';    // $primary-foreground
const TOOLTIP_FONT = "'Inter', system-ui, -apple-system, sans-serif"; // $font-family
const TOOLTIP_RADIUS = '6px';     // $radius-sm
const TOOLTIP_SHADOW = '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)'; // $shadow-md

let nextId = 0;

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  appTooltip = input<string>('');
  tooltipPosition = input<TooltipPosition>('top');
  tooltipDelay = input<number>(300);
  tooltipDisabled = input<boolean>(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  private tooltipEl: HTMLElement | null = null;
  private arrowEl: HTMLElement | null = null;
  private showTimerId: number | null = null;
  private hideTimerId: number | null = null;
  private currentPosition: TooltipPosition = 'top';
  private readonly tooltipId = `app-tooltip-${++nextId}`;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.scheduleShow();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hide();
  }

  @HostListener('focus')
  onFocus(): void {
    this.show();
  }

  @HostListener('blur')
  onBlur(): void {
    this.hide();
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.removeTooltip(true);
  }

  private scheduleShow(): void {
    if (this.tooltipDisabled() || !this.appTooltip().trim()) return;

    this.clearTimers();
    const delay = Math.max(0, this.tooltipDelay());
    this.showTimerId = window.setTimeout(() => this.show(), delay);
  }

  private show(): void {
    if (this.tooltipDisabled() || !this.appTooltip().trim()) return;
    if (this.tooltipEl) return;

    this.clearTimers();

    this.tooltipEl = this.renderer.createElement('div');
    this.arrowEl = this.renderer.createElement('span');

    this.renderer.addClass(this.tooltipEl, 'tooltip');
    this.renderer.addClass(this.arrowEl, 'tooltip__arrow');
    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipEl, 'id', this.tooltipId);

    this.applyBaseStyles();

    const textNode = this.renderer.createText(this.appTooltip());
    this.renderer.appendChild(this.tooltipEl, textNode);
    this.renderer.appendChild(this.tooltipEl, this.arrowEl);
    this.renderer.appendChild(this.document.body, this.tooltipEl);

    this.renderer.setAttribute(this.host.nativeElement, 'aria-describedby', this.tooltipId);

    this.applyPosition(this.tooltipPosition());

    requestAnimationFrame(() => {
      if (!this.tooltipEl) return;
      this.renderer.setStyle(this.tooltipEl, 'opacity', '1');
      this.renderer.setStyle(this.tooltipEl, 'transform', 'translate(0, 0)');
    });
  }

  private hide(): void {
    this.clearTimers();
    if (!this.tooltipEl) return;

    this.applyHiddenTransform();
    this.renderer.setStyle(this.tooltipEl, 'opacity', '0');
    this.hideTimerId = window.setTimeout(() => this.removeTooltip(), ANIMATION_MS);
  }

  private removeTooltip(immediate = false): void {
    if (!this.tooltipEl) return;

    if (immediate) {
      this.renderer.removeChild(this.document.body, this.tooltipEl);
    } else if (this.tooltipEl.parentNode) {
      this.renderer.removeChild(this.document.body, this.tooltipEl);
    }

    this.renderer.removeAttribute(this.host.nativeElement, 'aria-describedby');
    this.tooltipEl = null;
    this.arrowEl = null;
  }

  private clearTimers(): void {
    if (this.showTimerId !== null) {
      window.clearTimeout(this.showTimerId);
      this.showTimerId = null;
    }

    if (this.hideTimerId !== null) {
      window.clearTimeout(this.hideTimerId);
      this.hideTimerId = null;
    }
  }

  private applyPosition(position: TooltipPosition): void {
    if (!this.tooltipEl) return;

    const hostRect = this.host.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();

    let nextPosition = position;
    let coords = this.calculatePosition(nextPosition, hostRect, tooltipRect);

    if (!this.fitsViewport(coords, tooltipRect)) {
      const fallback = this.getOpposite(nextPosition);
      const fallbackCoords = this.calculatePosition(fallback, hostRect, tooltipRect);
      if (this.fitsViewport(fallbackCoords, tooltipRect)) {
        nextPosition = fallback;
        coords = fallbackCoords;
      }
    }

    const left = this.clamp(coords.left, tooltipRect.width, window.innerWidth);
    const top = this.clamp(coords.top, tooltipRect.height, window.innerHeight);

    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);

    this.updatePositionClasses(nextPosition);
  }

  private calculatePosition(
    position: TooltipPosition,
    hostRect: DOMRect,
    tooltipRect: DOMRect,
  ): { top: number; left: number } {
    switch (position) {
      case 'bottom':
        return {
          top: hostRect.bottom + GAP,
          left: hostRect.left + (hostRect.width - tooltipRect.width) / 2,
        };
      case 'left':
        return {
          top: hostRect.top + (hostRect.height - tooltipRect.height) / 2,
          left: hostRect.left - tooltipRect.width - GAP,
        };
      case 'right':
        return {
          top: hostRect.top + (hostRect.height - tooltipRect.height) / 2,
          left: hostRect.right + GAP,
        };
      case 'top':
      default:
        return {
          top: hostRect.top - tooltipRect.height - GAP,
          left: hostRect.left + (hostRect.width - tooltipRect.width) / 2,
        };
    }
  }

  private fitsViewport(
    coords: { top: number; left: number },
    tooltipRect: DOMRect,
  ): boolean {
    return (
      coords.top >= 0 &&
      coords.left >= 0 &&
      coords.left + tooltipRect.width <= window.innerWidth &&
      coords.top + tooltipRect.height <= window.innerHeight
    );
  }

  private clamp(value: number, size: number, max: number): number {
    const min = VIEWPORT_PADDING;
    const maxValue = max - size - VIEWPORT_PADDING;
    return Math.min(Math.max(value, min), Math.max(maxValue, min));
  }

  private updatePositionClasses(position: TooltipPosition): void {
    if (!this.tooltipEl || !this.arrowEl) return;

    this.applyPositionStyles(position);
    this.currentPosition = position;
  }

  private getOpposite(position: TooltipPosition): TooltipPosition {
    switch (position) {
      case 'top':
        return 'bottom';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        return 'top';
    }
  }

  private applyBaseStyles(): void {
    if (!this.tooltipEl || !this.arrowEl) return;

    const styles: Record<string, string> = {
      position: 'fixed',
      background: TOOLTIP_BG,
      color: TOOLTIP_TEXT,
      fontFamily: TOOLTIP_FONT,
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '1.4',
      padding: '6px 10px',
      borderRadius: TOOLTIP_RADIUS,
      maxWidth: '240px',
      wordWrap: 'break-word',
      zIndex: '9999',
      pointerEvents: 'none',
      whiteSpace: 'normal',
      boxShadow: TOOLTIP_SHADOW,
      opacity: '0',
      transition: 'all 150ms ease',
    };

    Object.entries(styles).forEach(([prop, value]) => {
      this.renderer.setStyle(this.tooltipEl, prop, value);
    });

    this.renderer.setStyle(this.arrowEl, 'position', 'absolute');
    this.renderer.setStyle(this.arrowEl, 'width', '0');
    this.renderer.setStyle(this.arrowEl, 'height', '0');
    this.renderer.setStyle(this.arrowEl, 'borderStyle', 'solid');
  }

  private applyPositionStyles(position: TooltipPosition): void {
    if (!this.tooltipEl || !this.arrowEl) return;

    this.resetArrowPosition();

    switch (position) {
      case 'bottom':
        this.renderer.setStyle(this.arrowEl, 'top', '-6px');
        this.renderer.setStyle(this.arrowEl, 'left', '50%');
        this.renderer.setStyle(this.arrowEl, 'transform', 'translateX(-50%)');
        this.renderer.setStyle(this.arrowEl, 'borderWidth', '0 6px 6px 6px');
        this.renderer.setStyle(
          this.arrowEl,
          'borderColor',
          `transparent transparent ${TOOLTIP_BG} transparent`,
        );
        break;
      case 'left':
        this.renderer.setStyle(this.arrowEl, 'right', '-6px');
        this.renderer.setStyle(this.arrowEl, 'top', '50%');
        this.renderer.setStyle(this.arrowEl, 'transform', 'translateY(-50%)');
        this.renderer.setStyle(this.arrowEl, 'borderWidth', '6px 0 6px 6px');
        this.renderer.setStyle(
          this.arrowEl,
          'borderColor',
          `transparent transparent transparent ${TOOLTIP_BG}`,
        );
        break;
      case 'right':
        this.renderer.setStyle(this.arrowEl, 'left', '-6px');
        this.renderer.setStyle(this.arrowEl, 'top', '50%');
        this.renderer.setStyle(this.arrowEl, 'transform', 'translateY(-50%)');
        this.renderer.setStyle(this.arrowEl, 'borderWidth', '6px 6px 6px 0');
        this.renderer.setStyle(
          this.arrowEl,
          'borderColor',
          `transparent ${TOOLTIP_BG} transparent transparent`,
        );
        break;
      case 'top':
      default:
        this.renderer.setStyle(this.arrowEl, 'bottom', '-6px');
        this.renderer.setStyle(this.arrowEl, 'left', '50%');
        this.renderer.setStyle(this.arrowEl, 'transform', 'translateX(-50%)');
        this.renderer.setStyle(this.arrowEl, 'borderWidth', '6px 6px 0 6px');
        this.renderer.setStyle(
          this.arrowEl,
          'borderColor',
          `${TOOLTIP_BG} transparent transparent transparent`,
        );
        break;
    }

    this.applyHiddenTransform(position);
  }

  private applyHiddenTransform(position: TooltipPosition = this.currentPosition): void {
    if (!this.tooltipEl) return;

    const transforms: Record<TooltipPosition, string> = {
      top: 'translateY(-4px)',
      bottom: 'translateY(4px)',
      left: 'translateX(-4px)',
      right: 'translateX(4px)',
    };
    this.renderer.setStyle(this.tooltipEl, 'transform', transforms[position]);
  }

  private resetArrowPosition(): void {
    if (!this.arrowEl) return;

    ['top', 'right', 'bottom', 'left'].forEach((side) => {
      this.renderer.removeStyle(this.arrowEl, side);
    });
  }
}
