import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeInputTextComponent } from '../../../../../shared/components/primeng/p-input-text/p-input-text.component';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../../../models/department-dto';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';

@Component({
    selector: 'app-add-edit-activity',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, PrimeInputTextComponent, SubmitButtonsComponent],
    templateUrl: './add-edit-activity.component.html',
    styleUrl: './add-edit-activity.component.css'
})
export class AddEditActivityComponent extends BaseEditComponent implements OnInit {
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
            this.getEditActivity();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            title: ['', Validators.required],
            description: [''],
            date: ['', Validators.required],
            image: ['']
        });
    }

    getEditActivity() {
        this.departmentsService.getStaticActivities(this.departmentId).subscribe({
            next: (activities: Activity[]) => {
                const activity = activities.find(a => a.id === this.id);
                if (activity) {
                    this.initFormGroup();
                    this.form.patchValue(activity);
                }
            },
            error: (error: any) => {
                this.alert.error('خطأ في جلب النشاط');
            }
        });
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const activity = { ...this.form.value, departmentId: this.departmentId };
        if (this.pageType === 'add') {
            // Mock add operation for static data
            console.log('Adding activity:', activity);
            this.closeDialog();
        }
        if (this.pageType === 'edit') {
            // Mock update operation for static data
            console.log('Updating activity:', activity);
            this.closeDialog();
        }
    }

    closeDialog() {
        this.dialogRef?.close();
    }
}