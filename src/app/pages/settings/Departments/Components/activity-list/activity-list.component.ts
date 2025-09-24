import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { PTitleToolbarComponent } from '../../../../../shared/components/primeng/p-title-toolbar/p-title-toolbar.component';
import { PrimeDataTableComponent } from '../../../../../shared/components/primeng/p-datatable/p-datatable.component';
import { Activity } from '../../../../models/department-dto';
import { AddEditActivityComponent } from '../add-edit-activity/add-edit-activity.component';

@Component({
    selector: 'app-activity-list',
    standalone: true,
    imports: [RouterModule, CardModule, PTitleToolbarComponent, PrimeDataTableComponent],
    templateUrl: './activity-list.component.html',
    styleUrl: './activity-list.component.css'
})
export class ActivityListComponent extends BaseListComponent {
    @Input() departmentId: string = '';
    tableOptions!: TableOptions;
    service = inject(DepartmentsService);

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.initializeTableOptions();
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: `v1/departments/${this.departmentId}/activities`,
                delete: `v1/departments/${this.departmentId}/activities/delete`
            },
            inputCols: [
                { field: 'title', header: 'العنوان', filter: true, filterMode: 'text' },
                { field: 'description', header: 'الوصف', filter: false },
                { field: 'date', header: 'التاريخ', filter: true, filterMode: 'text' }
            ],
            inputActions: [
                {
                    name: 'Edit',
                    icon: 'pi pi-file-edit',
                    color: 'text-middle',
                    isCallBack: true,
                    call: (row: Activity) => this.openEdit(row),
                    allowAll: true
                },
                {
                    name: 'DELETE',
                    icon: 'pi pi-trash',
                    color: 'text-error',
                    allowAll: true,
                    isDelete: true
                }
            ],
            permissions: {
                componentName: 'ACTIVITY-MANAGEMENT',
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
            responsiveDisplayedProperties: ['title', 'date']
        };
    }



    openAdd() {
        this.openDialog(AddEditActivityComponent, 'إضافة نشاط جديد', { pageType: 'add', departmentId: this.departmentId });
    }

    openEdit(rowData: Activity) {
        this.openDialog(AddEditActivityComponent, 'تعديل النشاط', { pageType: 'edit', row: { rowData }, departmentId: this.departmentId });
    }

    override ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    override handleEvent(event: any) {
    if (event.eventType === 'delete') {
        console.log('Deleting activity with ID:', event.data);
        this.loadDataFromServer();
    }
}
}