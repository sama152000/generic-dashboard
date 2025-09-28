import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { PTitleToolbarComponent } from '../../../../../shared/components/primeng/p-title-toolbar/p-title-toolbar.component';
import { PrimeDataTableComponent } from '../../../../../shared/components/primeng/p-datatable/p-datatable.component';
import { Faculty } from '../../../../models/department-dto';
import { AddEditFacultyComponent } from '../add-edit-faculty/add-edit-faculty.component';
import { DataTableService } from '../../../../../shared/services/table/datatable.service';

@Component({
    selector: 'app-faculty-list',
    standalone: true,
    imports: [RouterModule, CardModule, PTitleToolbarComponent, PrimeDataTableComponent],
    templateUrl: './faculty-list.component.html',
    styleUrl: './faculty-list.component.css'
})
export class FacultyListComponent extends BaseListComponent {
    @Input() departmentId: string = '';
    tableOptions!: TableOptions;
    override data: Faculty[] = [];
    service = inject(DepartmentsService);
    override dataTableService = inject(DataTableService);

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
                getAll: `v1/departments/${this.departmentId}/faculty`,
                delete: `v1/departments/${this.departmentId}/faculty/delete`
            },
            inputCols: [
                { field: 'name', header: 'الاسم', filter: true, filterMode: 'text' },
                { field: 'title', header: 'اللقب', filter: true, filterMode: 'text' },
                { field: 'specialization', header: 'التخصص', filter: true, filterMode: 'text' },
                { field: 'email', header: 'الإيميل', filter: false }
            ],
            inputActions: [
                {
                    name: 'Edit',
                    icon: 'pi pi-file-edit',
                    color: 'text-middle',
                    isCallBack: true,
                    call: (row: Faculty) => this.openEdit(row),
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
                componentName: 'FACULTY-MANAGEMENT',
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
            responsiveDisplayedProperties: ['name', 'title']
        };
    }

    override loadDataFromServer(): void {
        this.service.getFaculty(this.departmentId).subscribe({
            next: (faculty: Faculty[]) => {
                this.data = faculty;
                this.totalCount = faculty.length;
            },
            error: (error: any) => {
                console.error('Error loading faculty:', error);
                this.alert.error('خطأ في جلب أعضاء هيئة التدريس');
            }
        });
    }

    override handleEvent(event: any) {
        if (event.eventType === 'delete') {
            this.service.removeFaculty(this.departmentId, event.data.id).subscribe({
                next: () => {
                    this.alert.success('تم حذف عضو هيئة التدريس بنجاح');
                    this.loadDataFromServer();
                },
                error: (error: any) => {
                    console.error('Error deleting faculty:', error);
                    this.alert.error('خطأ في حذف عضو هيئة التدريس');
                }
            });
        }
    }

    openAdd() {
        this.openDialog(AddEditFacultyComponent, 'إضافة عضو هيئة تدريس جديد', { pageType: 'add', departmentId: this.departmentId });
    }

    openEdit(rowData: Faculty) {
        this.openDialog(AddEditFacultyComponent, 'تعديل عضو هيئة التدريس', { pageType: 'edit', row: { rowData }, departmentId: this.departmentId });
    }

    override ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}