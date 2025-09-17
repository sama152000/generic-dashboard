import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    // TODO: Implement export functionality
    console.warn('Export functionality not implemented yet.');
  }
}
