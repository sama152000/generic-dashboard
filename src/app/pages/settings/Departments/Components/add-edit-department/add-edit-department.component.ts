import { Component, inject, OnInit } from '@angular/core';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';
import { PrimeDataTableComponent } from '../../../../../shared/components/primeng/p-datatable/p-datatable.component';
import { PTitleToolbarComponent } from '../../../../../shared/components/primeng/p-title-toolbar/p-title-toolbar.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { TableOptions } from '../../../../../shared/interfaces';
import { HttpService } from '../../../../../core/services/http/http.service';

@Component({
    selector: 'app-add-edit-department',
    standalone: true,
    imports: [CardModule, ButtonModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeDataTableComponent, PTitleToolbarComponent],
    templateUrl: './add-edit-department.component.html',
})
export class AddEditDepartmentComponent extends BaseListComponent implements OnInit {
    override dialogService: DialogService = inject(DialogService);
    departmentsService: DepartmentsService = inject(DepartmentsService);
    fb = inject(FormBuilder);
    private config: DynamicDialogConfig = inject(DynamicDialogConfig);

    // Form properties from BaseEditComponent
    model: any = {};
    form!: FormGroup;
    isEnglish = false;
    override language: string = 'en';
    id: string = '';
    override pageType: string = '';

    override tableOptions: TableOptions = {
        inputUrl: {
            getAll: 'v1/departments/getAll',
            delete: 'v1/departments/delete/'
        },
        bodyOptions: {
            pageNumber: 1,
            pageSize: 5,
            orderByValue: [{ colId: 'id', sort: 'asc' }],
            filter: {}
        },
        appId: 0,
        inputCols: [
            { field: 'code', header: 'الكود', filter: true, filterMode: 'text' },
            { field: 'nameAr', header: 'الاسم بالعربية', filter: true, filterMode: 'text' },
            { field: 'nameEn', header: 'الاسم بالإنجليزية', filter: true, filterMode: 'text' }
        ],
        inputActions: [
            { name: 'تعديل', icon: 'pi pi-pencil', isEdit: true, route: '/pages/settings/Departments/', allowAll: true },
            { name: 'حذف', icon: 'pi pi-trash', isDelete: true, allowAll: true }
        ],
        permissions: { componentName: 'Departments', listOfPermissions: [], allowAll: true }
    };

    override get service(): HttpService {
        return this.departmentsService;
    }

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        // Check if this is opened as a dialog
        if (this.config.data) {
            this.pageType = this.config.data.pageType;
            if (this.pageType === 'edit') {
                this.id = this.config.data.row.rowData.id;
            }
        }

        if (this.pageType === 'edit') {
            this.getEditDepartment();
        } else if (this.pageType === 'add') {
            this.initFormGroup();
        } else {
            // This is the main list view
            this.loadDataFromServer();
            this.columnSearchInput();
        }
    }

    openAddDialog() {
        this.openDialog(AddEditDepartmentComponent, 'إضافة قسم جديد', { pageType: 'add' });
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            code: ['', Validators.required],
            nameAr: ['', Validators.required],
            nameEn: ['']
        });
    }

    getEditDepartment = () => {
        this.departmentsService.getEditDepartments(this.id).subscribe((department: any) => {
            this.initFormGroup();
            this.form.patchValue(department);
        });
    };

    submit() {
        if (this.pageType === 'add') {
            this.departmentsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        }
        if (this.pageType === 'edit') {
            this.departmentsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
        }
    }

    closeDialog() {
        if (this.dialogRef) {
            this.dialogRef.close();
        } else {
            this.dialogService.dialogComponentRefMap.forEach((dialog) => {
                dialog.destroy();
            });
        }
    }
}
