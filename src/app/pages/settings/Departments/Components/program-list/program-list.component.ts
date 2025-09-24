import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { PTitleToolbarComponent } from '../../../../../shared/components/primeng/p-title-toolbar/p-title-toolbar.component';
import { PrimeDataTableComponent } from '../../../../../shared/components/primeng/p-datatable/p-datatable.component';
import { Program } from '../../../../models/department-dto';
import { AddEditProgramComponent } from '../add-edit-program/add-edit-program.component';
import { DataTableService } from '../../../../../shared/services/table/datatable.service';

@Component({
    selector: 'app-program-list',
    standalone: true,
    imports: [RouterModule, CardModule, PTitleToolbarComponent, PrimeDataTableComponent],
    templateUrl: './program-list.component.html',
    styleUrl: './program-list.component.css'
})
export class ProgramListComponent extends BaseListComponent {
    @Input() departmentId: string = '';
    tableOptions!: TableOptions;
   override data: Program[] = [];
    service = inject(DepartmentsService);
    override dataTableService = inject(DataTableService);

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.initializeTableOptions();
        this.loadData();
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: '',
                delete: ''
            },
            inputCols: [
                { field: 'name', header: 'الاسم', filter: true, filterMode: 'text' },
                { field: 'description', header: 'الوصف', filter: false },
                { field: 'duration', header: 'المدة', filter: true, filterMode: 'text' },
                { field: 'degree', header: 'الدرجة', filter: true, filterMode: 'text' }
            ],
            inputActions: [
                {
                    name: 'Edit',
                    icon: 'pi pi-file-edit',
                    color: 'text-middle',
                    isCallBack: true,
                    call: (row: Program) => this.openEdit(row),
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
                componentName: 'PROGRAM-MANAGEMENT',
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
            responsiveDisplayedProperties: ['name', 'degree']
        };
    }

    loadData() {
        this.service.getStaticPrograms(this.departmentId).subscribe({
            next: (programs: Program[]) => {
                this.data = programs;
            },
            error: (error: any) => {
                console.error('Error loading programs:', error);
            }
        });
    }

    override handleEvent(event: any) {
        if (event.eventType === 'delete') {
            // Mock delete operation for static data
            console.log('Deleting program with ID:', event.data);
            this.loadData(); // Reload data after delete
        }
    }



    openAdd() {
        this.openDialog(AddEditProgramComponent, 'إضافة برنامج جديد', { pageType: 'add', departmentId: this.departmentId });
    }

    openEdit(rowData: Program) {
        this.openDialog(AddEditProgramComponent, 'تعديل البرنامج', { pageType: 'edit', row: { rowData }, departmentId: this.departmentId });
    }

    override ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}