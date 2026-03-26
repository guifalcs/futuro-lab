import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableCell]',
  standalone: true,
})
export class TableCellDirective {
  key = input.required<string>({ alias: 'appTableCell' });
  templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}
