import { Component, input, model, output } from '@angular/core';
import {
  AlertTriangle,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  ChartBar,
  CheckCircle,
  ClipboardList,
  Database,
  Eye,
  FileBadge,
  FileCheck,
  FileSignature,
  FileText,
  FlaskConical,
  FlaskRound,
  Grid3x3,
  Handshake,
  House,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  List,
  Lock,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  Mail,
  MapPin,
  Microscope,
  Package,
  PackageCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Receipt,
  Scale,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Tag,
  TestTubes,
  TrendingDown,
  TrendingUp,
  Truck,
  User,
  UserCheck,
  UserPlus,
  UserRound,
  Users,
  Wallet,
  Wrench,
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
        // Navigation icons
        AlertTriangle,
        Bell,
        BookOpen,
        Briefcase,
        Building2,
        Calendar,
        ChartBar,
        CheckCircle,
        ClipboardList,
        Database,
        Eye,
        FileBadge,
        FileCheck,
        FileSignature,
        FileText,
        FlaskConical,
        FlaskRound,
        Grid3x3,
        Handshake,
        House,
        LayoutDashboard,
        LayoutTemplate,
        LifeBuoy,
        List,
        Lock,
        Mail,
        MapPin,
        Microscope,
        Package,
        PackageCheck,
        Plus,
        Receipt,
        Scale,
        Search,
        Settings,
        Shield,
        ShieldCheck,
        Tag,
        TestTubes,
        TrendingDown,
        TrendingUp,
        Truck,
        User,
        UserCheck,
        UserPlus,
        UserRound,
        Users,
        Wallet,
        Wrench,
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
