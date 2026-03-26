import { Component, input, output, signal, HostListener, ElementRef, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from 'lucide-angular';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

export interface INavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, LucideAngularModule, AvatarComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        ChevronDown,
        LogOut,
        Menu,
        X,
      }),
      multi: true,
    },
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly el = inject(ElementRef);

  readonly userName = input<string>('');
  readonly userAvatar = input<string>('');
  readonly navItems = input<INavItem[]>([]);
  readonly activeRoute = input<string>('');
  readonly logoSrc = input<string>('');
  readonly showMenuButton = input<boolean>(false);

  readonly navigate = output<{ route: string }>();
  readonly logoClick = output<void>();
  readonly logoutClick = output<void>();
  readonly menuClick = output<void>();

  readonly userMenuOpen = signal(false);
  readonly mobileMenuOpen = signal(false);

  onNavClick(route: string): void {
    this.navigate.emit({ route });
    this.mobileMenuOpen.set(false);
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.userMenuOpen.update(v => !v);
  }

  toggleMobileMenu(event: Event): void {
    event.stopPropagation();
    if (this.showMenuButton()) {
      this.menuClick.emit();
    } else {
      this.mobileMenuOpen.update(v => !v);
    }
  }

  onLogoutClick(): void {
    this.logoutClick.emit();
    this.userMenuOpen.set(false);
  }

  onUserMenuKeydown(event: KeyboardEvent): void {
    const { key } = event;
    if (!['Space', 'Enter', 'ArrowDown', 'ArrowUp', 'Escape'].includes(key)) return;
    event.preventDefault();

    const isOpen = this.userMenuOpen();

    if (key === 'Space' || key === 'Enter') {
      if (!isOpen) this.userMenuOpen.set(true);
      return;
    }

    if (key === 'Escape') {
      this.userMenuOpen.set(false);
      return;
    }

    if (key === 'ArrowDown') {
      if (!isOpen) {
        this.userMenuOpen.set(true);
        return;
      }
      const items = this.getDropdownItems();
      if (items.length > 0) items[0].focus();
      return;
    }

    if (key === 'ArrowUp') {
      if (!isOpen) return;
      const items = this.getDropdownItems();
      if (items.length > 0) items[items.length - 1].focus();
    }
  }

  onDropdownKeydown(event: KeyboardEvent): void {
    const { key } = event;
    if (!['ArrowDown', 'ArrowUp', 'Escape'].includes(key)) return;
    event.preventDefault();

    if (key === 'Escape') {
      this.userMenuOpen.set(false);
      const userBtn = this.el.nativeElement.querySelector('.header__user-btn') as HTMLElement | null;
      userBtn?.focus();
      return;
    }

    const items = this.getDropdownItems();
    if (items.length === 0) return;
    const focused = document.activeElement as HTMLElement;
    const index = items.indexOf(focused);

    if (key === 'ArrowDown') {
      const next = index < items.length - 1 ? index + 1 : 0;
      items[next].focus();
    } else if (key === 'ArrowUp') {
      const prev = index > 0 ? index - 1 : items.length - 1;
      items[prev].focus();
    }
  }

  private getDropdownItems(): HTMLElement[] {
    return Array.from(
      this.el.nativeElement.querySelectorAll('.header__dropdown-item') as NodeListOf<HTMLElement>
    );
  }

  @HostListener('click', ['$event'])
  onHostClick(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.userMenuOpen.set(false);
    this.mobileMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.userMenuOpen.set(false);
    this.mobileMenuOpen.set(false);
  }
}
