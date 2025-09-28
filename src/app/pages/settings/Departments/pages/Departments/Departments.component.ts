import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditDepartmentComponent } from '../../Components/add-edit-department/add-edit-department.component';
import { PTitleToolbarComponent } from "../../../../../shared/components/primeng/p-title-toolbar/p-title-toolbar.component";
import { PrimeDataTableComponent } from "../../../../../shared/components/primeng/p-datatable/p-datatable.component";
import { DataTableService } from '../../../../../shared/services/table/datatable.service';
import { HttpService } from '../../../../../core/services/http/http.service';

@Component({
    selector: 'app-departments',
    standalone: true,
    imports: [RouterModule, CardModule, PTitleToolbarComponent, PrimeDataTableComponent],
    templateUrl: './Departments.component.html',
    styleUrl: './Departments.component.css'
})
export class DepartmentsComponent extends BaseListComponent {
    @Input() apiConfig: { getPaged: string; delete: string } = {
        getPaged: 'getPaged',
        delete: 'deletesoft'
    };

    isEnglish = false;
    tableOptions!: TableOptions;
    private _service = inject(DepartmentsService);
    override dataTableService = inject(DataTableService);

    override get service(): HttpService {
        return this._service;
    }

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.initializeTableOptions();
        this.loadDataFromServer();
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: `v1/departments/${this.apiConfig.getPaged}`,
                delete: `v1/departments/${this.apiConfig.delete}`
            },
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions(),
            permissions: {
                componentName: 'DEPARTMENTS-MANAGEMENT',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                pageNumber: 1,
                pageSize: 10,
                orderByValue: [{ colId: 'id', sort: 'asc' }],
                filter: {}
            },
            appId: 0,
            responsiveDisplayedProperties: ['name', 'shortName', 'type']
        };
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'name',
                header: 'الاسم',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'shortName',
                header: 'الاسم المختصر',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'type',
                header: 'النوع',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'overview',
                header: 'نظرة عامة',
                filter: false
            }
        ];
    }

    initializeTableActions(): TableOptions['inputActions'] {
        return [
            {
                name: 'Edit',
                icon: 'pi pi-file-edit',
                color: 'text-middle',
                isCallBack: true,
                call: (row: any) => {
                    this.openEdit(row);
                },
                allowAll: true
            },
            {
                name: 'DELETE',
                icon: 'pi pi-trash',
                color: 'text-error',
                allowAll: true,
                isDelete: true
            },
            {
                name: 'Details',
                icon: 'pi pi-info-circle',
                color: 'text-middle',
                isCallBack: true,
                call: () => {
                    this.route.navigate(['features'], { relativeTo: this.activatedRoute });
                },
                allowAll: true
            }
        ];
    }

    override loadDataFromServer(): void {
        this._service.departments.subscribe({
            next: (departments) => {
                this.data = departments;
                this.totalCount = departments.length;
            },
            error: (error: any) => {
                console.error('Error loading departments:', error);
                this.alert.error('خطأ في جلب الأقسام');
            }
        });
    }

    override handleEvent(event: any) {
        if (event.eventType === 'delete') {
            this._service.remove(event.data).subscribe({
                next: () => {
                    this.alert.success('تم حذف القسم بنجاح');
                    this.loadDataFromServer();
                },
                error: (error: any) => {
                    console.error('Error deleting department:', error);
                    this.alert.error('خطأ في حذف القسم');
                }
            });
        }
    }

    openAdd() {
        this.openDialog(AddEditDepartmentComponent, 'إضافة قسم جديد', {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditDepartmentComponent, 'تعديل القسم', {
            pageType: 'edit',
            row: { rowData }
        });
    }

    override ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}