import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  Upload,
  Image,
  FileText,
  X,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../shared/components/modal/modal-footer.directive';
import { ToastService } from '../../../core/services/toast.service';
import { MOCK_CATEGORIES, MOCK_PRIORITIES, MOCK_MODULES } from '../data/support-mock';

interface ISelectedFile {
  file: File;
  id: string;
  previewUrl: string | null;
}

function parseBrowserInfo(ua: string): string {
  let browser = 'Navegador desconhecido';
  let os = '';

  if (ua.includes('Firefox/')) {
    const match = ua.match(/Firefox\/(\d+)/);
    browser = `Firefox ${match ? match[1] : ''}`;
  } else if (ua.includes('Edg/')) {
    const match = ua.match(/Edg\/(\d+)/);
    browser = `Edge ${match ? match[1] : ''}`;
  } else if (ua.includes('Chrome/')) {
    const match = ua.match(/Chrome\/(\d+)/);
    browser = `Chrome ${match ? match[1] : ''}`;
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    const match = ua.match(/Version\/(\d+)/);
    browser = `Safari ${match ? match[1] : ''}`;
  }

  if (ua.includes('Windows NT 10.0')) {
    os = 'Windows 10/11';
  } else if (ua.includes('Windows NT')) {
    os = 'Windows';
  } else if (ua.includes('Mac OS X')) {
    os = 'macOS';
  } else if (ua.includes('Linux')) {
    os = 'Linux';
  }

  return os ? `${browser} / ${os}` : browser;
}

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    CardComponent,
    CardHeaderDirective,
    BadgeComponent,
    ModalComponent,
    ModalFooterDirective,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, Upload, Image, FileText, X }),
      multi: true,
    },
  ],
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.scss',
})
export class TicketCreateComponent {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  readonly categoryOptions = MOCK_CATEGORIES;
  readonly priorityOptions = MOCK_PRIORITIES;
  readonly moduleOptions = MOCK_MODULES;

  // Form fields
  readonly ticketTitle = signal('');
  readonly category = signal('');
  readonly priority = signal('');
  readonly affectedModule = signal('');
  readonly description = signal('');
  readonly selectedFiles = signal<ISelectedFile[]>([]);

  // System info (auto-captured)
  readonly browserInfo = signal('');
  readonly screenResolution = signal('');
  readonly currentDateTime = signal('');
  readonly currentUser = signal('Sirlene Sales');

  // Validation errors
  readonly titleError = signal('');
  readonly categoryError = signal('');
  readonly priorityError = signal('');
  readonly moduleError = signal('');
  readonly descriptionError = signal('');

  // State
  readonly submitLoading = signal(false);
  readonly discardModalOpen = signal(false);
  readonly isDragging = signal(false);

  readonly isDirty = computed(() =>
    this.ticketTitle() !== '' ||
    this.category() !== '' ||
    this.priority() !== '' ||
    this.affectedModule() !== '' ||
    this.description() !== '' ||
    this.selectedFiles().length > 0
  );

  readonly descriptionHelp = computed(() => {
    const len = this.description().length;
    if (len > 0 && len < 125) {
      return `${len}/125 caracteres mínimos`;
    }
    return 'Mínimo de 125 caracteres. Quanto mais detalhes, mais rápido conseguimos resolver.';
  });

  constructor() {
    this.browserInfo.set(parseBrowserInfo(navigator.userAgent));
    this.screenResolution.set(`${window.innerWidth}x${window.innerHeight}`);
    this.currentDateTime.set(this.formatCurrentDateTime());
  }

  goBack(): void {
    this.router.navigate(['/suporte']);
  }

  onCancel(): void {
    if (this.isDirty()) {
      this.discardModalOpen.set(true);
    } else {
      this.goBack();
    }
  }

  closeDiscardModal(): void {
    this.discardModalOpen.set(false);
  }

  confirmDiscard(): void {
    this.discardModalOpen.set(false);
    this.goBack();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(Array.from(files));
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
      input.value = '';
    }
  }

  removeFile(fileId: string): void {
    this.selectedFiles.update(files => {
      const file = files.find(f => f.id === fileId);
      if (file?.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
      return files.filter(f => f.id !== fileId);
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  isImage(file: ISelectedFile): boolean {
    return file.file.type.startsWith('image/');
  }

  onSubmit(): void {
    this.titleError.set('');
    this.categoryError.set('');
    this.priorityError.set('');
    this.moduleError.set('');
    this.descriptionError.set('');

    let hasError = false;

    if (!this.ticketTitle().trim()) {
      this.titleError.set('Título é obrigatório');
      hasError = true;
    }

    if (!this.category()) {
      this.categoryError.set('Categoria é obrigatória');
      hasError = true;
    }

    if (!this.priority()) {
      this.priorityError.set('Prioridade é obrigatória');
      hasError = true;
    }

    if (!this.affectedModule()) {
      this.moduleError.set('Módulo afetado é obrigatório');
      hasError = true;
    }

    if (!this.description().trim()) {
      this.descriptionError.set('Descrição é obrigatória');
      hasError = true;
    } else if (this.description().trim().length < 125) {
      this.descriptionError.set('A descrição precisa ter pelo menos 125 caracteres');
      hasError = true;
    }

    if (hasError) {
      this.toastService.error('Preencha todos os campos obrigatórios corretamente');
      return;
    }

    this.submitLoading.set(true);

    setTimeout(() => {
      this.submitLoading.set(false);
      this.toastService.success('Ticket enviado com sucesso! Acompanhe o status na listagem.');
      this.goBack();
    }, 1500);
  }

  private processFiles(files: File[]): void {
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024;
    const maxFiles = 5;

    for (const file of files) {
      if (this.selectedFiles().length >= maxFiles) {
        this.toastService.error('Máximo de 5 arquivos permitidos.');
        break;
      }

      if (!allowedTypes.includes(file.type)) {
        this.toastService.error(`Tipo de arquivo não permitido: ${file.name}`);
        continue;
      }

      if (file.size > maxSize) {
        this.toastService.error(`Arquivo muito grande: ${file.name} (máx. 5MB)`);
        continue;
      }

      const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;

      this.selectedFiles.update(existing => {
        if (existing.length >= maxFiles) return existing;
        return [...existing, {
          file,
          id: crypto.randomUUID(),
          previewUrl,
        }];
      });
    }
  }

  private formatCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
