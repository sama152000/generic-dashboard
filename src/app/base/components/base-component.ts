import { OnInit, inject, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../core/services/alert/alert.service';
import { ExportExcelService } from '../../pages/service/export-excel.service';

@Directive()
export abstract class BaseComponent implements OnInit {
  pageTitle = '';
  pageType = '';

  alert = inject(AlertService);
  route = inject(Router);
  excel = inject(ExportExcelService);
  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = this.activatedRoute.snapshot.data['pageTitle'] || '';
    this.pageType = this.activatedRoute.snapshot.data['pageType'] || '';
  }
}
