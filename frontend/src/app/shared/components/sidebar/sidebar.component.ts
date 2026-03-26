import { Component, input, model, output } from '@angular/core';
import {
  Bell,
  Briefcase,
  Building2,
  Calendar,
  ChartBar,
  ClipboardList,
  FileText,
  House,
  LifeBuoy,
  LUCIDE_ICONS,
  LayoutDashboard,
  Lock,
  LucideAngularModule,
  LucideIconProvider,
  Mail,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings,
  TrendingUp,
  UserRound,
  Users,
  UserPlus,
  Shield,
  User,
} from 'lucide-angular';

export interface ISidebarItem {
  icon: string;
  label: string;
  route: string;
  badge?: string;
  isHeader?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        // Toggle icons
        PanelLeftClose,
        PanelLeftOpen,
        // Common navigation icons
        Bell,
        Briefcase,
        Building2,
        Calendar,
        ChartBar,
        ClipboardList,
        FileText,
        House,
        LayoutDashboard,
  Lock,
        Mail,
        Package,
        Search,
        Plus,
        Settings,
        TrendingUp,
        UserRound,
        Users,
        UserPlus,
        LifeBuoy,
        Shield,
        User,
      }),
      multi: true,
    },
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  items = input<ISidebarItem[]>([]);
  collapsed = model<boolean>(false);
  activeRoute = input<string>('');
  mobileOpen = model<boolean>(false);

  itemClick = output<ISidebarItem>();
  toggleCollapse = output<void>();

  toggleCollapsed(): void {
    this.collapsed.update(v => !v);
    this.toggleCollapse.emit();
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  onItemClick(item: ISidebarItem): void {
    this.itemClick.emit(item);
    if (this.mobileOpen()) {
      this.closeMobile();
    }
  }

  isActive(route: string): boolean {
    return this.activeRoute() === route;
  }

  trackByRoute(index: number, item: ISidebarItem): string {
    return item.isHeader ? `header-${index}-${item.label}` : item.route;
  }
}
