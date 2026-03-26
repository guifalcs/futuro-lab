import { Component, computed, effect, input, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  readonly name = input<string>('');
  readonly src = input<string>('');
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly status = input<'online' | 'offline' | 'busy' | 'away' | null>(null);

  protected readonly UserIcon = User;

  readonly imageError = signal(false);

  constructor() {
    effect(() => {
      this.src(); // track src changes
      untracked(() => this.imageError.set(false));
    });
  }

  readonly initials = computed(() => {
    const n = this.name().trim();
    if (!n) return '';
    const parts = n.split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  readonly backgroundColor = computed(() => {
    const n = this.name().trim();
    if (!n) return '#E5E7EB'; // fallback color
    const colors = ['#1D6AA5', '#7C3AED', '#DB2777', '#EA580C', '#CA8A04', '#16A34A', '#0D9488', '#6366F1'];
    let hash = 0;
    for (let i = 0; i < n.length; i++) {
      hash = n.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return colors[hash % colors.length];
  });

  readonly showImage = computed(() => !!this.src() && !this.imageError());
  readonly showInitials = computed(() => (!this.src() || this.imageError()) && !!this.name().trim());
  readonly showFallback = computed(() => (!this.src() || this.imageError()) && !this.name().trim());

  handleImageError(): void {
    this.imageError.set(true);
  }
}
