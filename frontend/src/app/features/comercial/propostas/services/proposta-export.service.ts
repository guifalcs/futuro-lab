import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IProposta, PropostaStatus } from '../models/proposta.model';

@Injectable({
  providedIn: 'root',
})
export class PropostaExportService {
  private readonly colunas = [
    'ID',
    'Status',
    'Responsável',
    'Nº Proposta',
    'Versão',
    'Cliente',
    'CNPJ Cliente',
    'Total R$',
    'Data Criação',
    'Validade',
  ];

  exportExcel(propostas: IProposta[]): void {
    const dados = propostas.map((p) => this.mapRow(p));
    const ws = XLSX.utils.json_to_sheet(dados);

    // Column widths
    ws['!cols'] = [
      { wch: 6 },
      { wch: 16 },
      { wch: 20 },
      { wch: 18 },
      { wch: 8 },
      { wch: 36 },
      { wch: 20 },
      { wch: 14 },
      { wch: 12 },
      { wch: 12 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Propostas');

    const dataAtual = this.formatarDataArquivo();
    XLSX.writeFile(wb, `propostas_${dataAtual}.xlsx`);
  }

  exportPdf(propostas: IProposta[]): void {
    const doc = new jsPDF({ orientation: 'landscape' });
    const dataAtual = this.formatarDataArquivo();

    doc.setFontSize(16);
    doc.text('FuturoLab — Propostas Comerciais', 14, 20);

    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 28);

    const body = propostas.map((p) => [
      p.id,
      p.status,
      p.responsavel,
      p.numeroProposta,
      p.versao,
      p.cliente,
      p.cnpjCliente,
      this.formatarMoeda(p.totalReais),
      this.formatarData(p.dataCriacao),
      this.formatarData(p.dataValidade),
    ]);

    autoTable(doc, {
      head: [this.colunas],
      body,
      startY: 34,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [29, 106, 165] },
      alternateRowStyles: { fillColor: [245, 247, 250] },
    });

    doc.save(`propostas_${dataAtual}.pdf`);
  }

  private mapRow(p: IProposta): Record<string, string | number> {
    return {
      ID: p.id,
      Status: p.status,
      'Responsável': p.responsavel,
      'Nº Proposta': p.numeroProposta,
      'Versão': p.versao,
      Cliente: p.cliente,
      'CNPJ Cliente': p.cnpjCliente,
      'Total R$': this.formatarMoeda(p.totalReais),
      'Data Criação': this.formatarData(p.dataCriacao),
      Validade: this.formatarData(p.dataValidade),
    };
  }

  private formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  private formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  private formatarDataArquivo(): string {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  }
}
