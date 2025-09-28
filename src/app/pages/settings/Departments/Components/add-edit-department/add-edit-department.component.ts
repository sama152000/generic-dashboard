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
    imports: [CardModule, FormsModule, ReactiveFormsModule, PrimeInputTextComponent, SubmitButtonsComponent],
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

    getEditDepartment() {
        this.departmentsService.getEditDepartments(this.id).subscribe({
            next: (department: Department | undefined) => {
                if (department) {
                    this.initFormGroup();
                    this.form.patchValue(department);
                } else {
                    this.alert.error('القسم غير موجود');
                }
            },
            error: (error: any) => {
                console.error('Error loading department:', error);
                this.alert.error('خطأ في جلب القسم');
            }
        });
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const department = this.form.value;
        if (this.pageType === 'add') {
            this.departmentsService.add(department).subscribe({
                next: () => {
                    this.alert.success('تم إضافة القسم بنجاح');
                    this.closeDialog();
                },
                error: (error: any) => {
                    console.error('Error adding department:', error);
                    this.alert.error('خطأ في إضافة القسم');
                }
            });
        }
        if (this.pageType === 'edit') {
            this.departmentsService.update(department).subscribe({
                next: () => {
                    this.alert.success('تم تعديل القسم بنجاح');
                    this.closeDialog();
                },
                error: (error: any) => {
                    console.error('Error updating department:', error);
                    this.alert.error('خطأ في تعديل القسم');
                }
            });
        }
    }

    closeDialog() {
        this.dialogRef?.close();
    }
}