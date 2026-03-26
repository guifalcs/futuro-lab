import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  companyName = input<string>('Status Contabilidade');
  version = input<string>('');
  logoSrc = input<string>('assets/images/logoRebuild.png');

  copyrightText = computed(
    () => `\u00A9 2026 ${this.companyName()}. Todos os direitos reservados.`
  );

  versionText = computed(() => {
    const v = this.version();
    return v ? `v${v}` : '';
  });
}
