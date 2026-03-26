import { Component, computed, inject, input, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Sidebar types
  private readonly emptySidebarItems: { icon: string; label: string; route: string; badge?: string }[] = [];

  // Inputs
  sidebarItems = input<{ icon: string; label: string; route: string; badge?: string }[]>([]);
  sidebarActiveRoute = input<string>('');

  // Signals
  sidebarCollapsed = signal<boolean>(false);
  sidebarMobileOpen = signal<boolean>(false);
  isMobile = signal<boolean>(false);
  routeSidebarItems = signal<{ icon: string; label: string; route: string; badge?: string }[]>([]);
  routeSidebarActiveRoute = signal<string>('');

  // Computed
  resolvedSidebarItems = computed(() => this.sidebarItems().length > 0 ? this.sidebarItems() : this.routeSidebarItems());
  resolvedSidebarActiveRoute = computed(() => this.sidebarActiveRoute() || this.routeSidebarActiveRoute());

  showSidebar = computed(() => this.resolvedSidebarItems().length > 0 || this.isMobile());
  effectiveSidebarItems = computed(() => {
    if (this.isMobile()) {
      const items: { icon: string; label: string; route: string; badge?: string; isHeader?: boolean }[] = [];
      const navs = this.navItems();
      const sidebars = this.resolvedSidebarItems();

      if (navs.length > 0) {
        items.push({ label: 'Módulos', route: '', icon: '', isHeader: true });
        items.push(...navs);
      }

      if (sidebars.length > 0) {
        items.push({ label: 'Menu da Página', route: '', icon: '', isHeader: true });
        items.push(...sidebars);
      }

      return items;
    }
    return this.resolvedSidebarItems();
  });

  // Header Mock Data
  navItems = signal([] as { label: string; route: string; icon: string }[]);
  userName = signal('Sirlene Sales');
  userAvatar = signal('');
  logoSrc = signal('assets/images/logo.webp');
  activeRoute = signal<string>('');

  ngOnInit() {
    this.updateActiveRoute(this.router.url);
    this.updateSidebarFromRoute();

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateActiveRoute(event.urlAfterRedirects);
      this.updateSidebarFromRoute();
    });

    this.checkResponsive();
    window.addEventListener('resize', this.checkResponsive.bind(this));
  }

  updateActiveRoute(url: string) {
    // Basic active route matching for the header
    const cleanUrl = url.split('?')[0];
    const segments = cleanUrl.split('/').filter(s => s);
    this.activeRoute.set(segments.length > 0 ? '/' + segments[0] : '/');
    this.routeSidebarActiveRoute.set(cleanUrl || '/');
  }

  updateSidebarFromRoute(): void {
    let current = this.route.firstChild;
    let sidebarItems = this.emptySidebarItems;

    while (current) {
      const data = current.snapshot.data as { sidebarItems?: { icon: string; label: string; route: string; badge?: string }[] };
      if (data?.sidebarItems) {
        sidebarItems = data.sidebarItems;
      }
      current = current.firstChild;
    }

    this.routeSidebarItems.set(sidebarItems);
  }

  checkResponsive() {
    const width = window.innerWidth;
    this.isMobile.set(width < 768);
    
    if (width > 1024) {
      this.sidebarCollapsed.set(false);
      this.sidebarMobileOpen.set(false);
    } else if (width >= 768 && width <= 1024) {
      this.sidebarCollapsed.set(true);
      this.sidebarMobileOpen.set(false);
    } else {
      this.sidebarCollapsed.set(false);
    }
  }

  onHeaderNavigate(route: string) {
    this.router.navigate([route]);
  }

  onMenuClick() {
    this.sidebarMobileOpen.update(v => !v);
  }

  onSidebarNavigate(route: string) {
    this.router.navigate([route]);
    if (window.innerWidth < 768) {
      this.sidebarMobileOpen.set(false);
    }
  }

  toggleSidebar() {
    this.sidebarCollapsed.update(v => !v);
  }
}
