import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeInputTextComponent } from '../../../../../shared/components/primeng/p-input-text/p-input-text.component';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { Faculty } from '../../../../models/department-dto';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';

@Component({
    selector: 'app-add-edit-faculty',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, PrimeInputTextComponent, SubmitButtonsComponent],
    templateUrl: './add-edit-faculty.component.html',
    styleUrl: './add-edit-faculty.component.css'
})
export class AddEditFacultyComponent extends BaseEditComponent implements OnInit {
    departmentsService = inject(DepartmentsService);
    dialogService = inject(DialogService);
    dialogRef = inject(DynamicDialogRef);
    dialogConfig = inject(DynamicDialogConfig);
    departmentId: string = '';

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        const dialogData = this.dialogConfig.data;
        if (dialogData) {
            this.pageType = dialogData.pageType;
            this.departmentId = dialogData.departmentId;
            if (this.pageType === 'edit' && dialogData.row?.rowData) {
                this.id = dialogData.row.rowData.id;
            }
        }
        if (this.pageType === 'edit') {
            this.getEditFaculty();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            title: ['', Validators.required],
            specialization: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            photo: ['']
        });
    }

    getEditFaculty() {
        this.departmentsService.getFaculty(this.departmentId).subscribe({
            next: (faculty: Faculty[]) => {
                const member = faculty.find(f => f.id === this.id);
                if (member) {
                    this.initFormGroup();
                    this.form.patchValue(member);
                }
            },
            error: (error: any) => {
                this.alert.error('خطأ في جلب عضو هيئة التدريس');
            }
        });
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const faculty = { ...this.form.value, departmentId: this.departmentId };
        if (this.pageType === 'add') {
            this.departmentsService.addFaculty(this.departmentId, faculty).subscribe({
                next: () => {
                    this.alert.success('تم إضافة عضو هيئة التدريس بنجاح');
                    this.closeDialog();
                },
                error: (error: any) => {
                    console.error('Error adding faculty:', error);
                    this.alert.error('خطأ في إضافة عضو هيئة التدريس');
                }
            });
        }
        if (this.pageType === 'edit') {
            this.departmentsService.updateFaculty(this.departmentId, faculty).subscribe({
                next: () => {
                    this.alert.success('تم تعديل عضو هيئة التدريس بنجاح');
                    this.closeDialog();
                },
                error: (error: any) => {
                    console.error('Error updating faculty:', error);
                    this.alert.error('خطأ في تعديل عضو هيئة التدريس');
                }
            });
        }
    }

    closeDialog() {
        this.dialogRef?.close();
    }
}