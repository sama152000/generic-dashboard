import { Component, inject, OnInit, Input } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeInputTextComponent } from '../../../../../shared/components/primeng/p-input-text/p-input-text.component';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../../../models/department-dto';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';

@Component({
    selector: 'app-add-edit-department',
    standalone: true,
    imports: [ CardModule, FormsModule, ReactiveFormsModule, PrimeInputTextComponent, SubmitButtonsComponent],
    templateUrl: './add-edit-department.component.html',
    styleUrl: './add-edit-department.component.css'
})
export class AddEditDepartmentComponent extends BaseEditComponent implements OnInit {
    departmentsService: DepartmentsService = inject(DepartmentsService);
    dialogService: DialogService = inject(DialogService);
    dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
    dialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);

    @Input() apiConfig: { getEdit: string; add: string; update: string } = {
        getEdit: 'getEdit',
        add: 'add',
        update: 'update'
    };

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        // Get dialog data properly
        const dialogData = this.dialogConfig.data;
        if (dialogData) {
            this.pageType = dialogData.pageType;
            if (this.pageType === 'edit' && dialogData.row?.rowData) {
                this.id = dialogData.row.rowData.id;
            }
        }

        if (this.pageType === 'edit') {
            this.getEditDepartment();
        } else {
            this.initFormGroup();
        }
    }

   initFormGroup() {
    this.form = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        shortName: ['', Validators.required],
        overview: [''],
        type: ['', Validators.required],
        image: [''],
        contact: this.fb.group({
            email: ['', Validators.email],
            phone: [''],
            office: ['', Validators.required],
            headOfDepartment: ['', Validators.required]
        })
    });
}
    getEditDepartment = () => {
        this.departmentsService.getStaticDepartment(this.id).subscribe({
            next: (department: Department | undefined) => {
                if (department) {
                    this.initFormGroup();
                    this.form.patchValue(department);
                }
            },
            error: (error: any) => {
                console.error('Error loading department:', error);
                // You might want to show an error message to the user here
            }
        });
    };

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.pageType === 'add') {
            // Mock add operation for static data
            console.log('Adding department:', this.form.value);
            this.closeDialog();
        }
        if (this.pageType === 'edit') {
            // Mock update operation for static data
            console.log('Updating department:', { id: this.id, ...this.form.value });
            this.closeDialog();
        }
    }

    closeDialog() {
        this.dialogRef?.close();
    }
}