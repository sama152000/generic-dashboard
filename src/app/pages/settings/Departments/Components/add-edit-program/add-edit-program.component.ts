import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeInputTextComponent } from '../../../../../shared/components/primeng/p-input-text/p-input-text.component';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../../../../models/department-dto';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';

@Component({
    selector: 'app-add-edit-program',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, PrimeInputTextComponent, SubmitButtonsComponent],
    templateUrl: './add-edit-program.component.html',
    styleUrl: './add-edit-program.component.css'
})
export class AddEditProgramComponent extends BaseEditComponent implements OnInit {
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
            this.getEditProgram();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            description: [''],
            duration: ['', Validators.required],
            degree: ['', Validators.required]
        });
    }

    getEditProgram() {
        this.departmentsService.getStaticPrograms(this.departmentId).subscribe({
            next: (programs: Program[]) => {
                const program = programs.find(p => p.id === this.id);
                if (program) {
                    this.initFormGroup();
                    this.form.patchValue(program);
                }
            },
            error: (error: any) => {
                this.alert.error('خطأ في جلب البرنامج');
            }
        });
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const program = { ...this.form.value, departmentId: this.departmentId };
        if (this.pageType === 'add') {
            // Mock add operation for static data
            console.log('Adding program:', program);
            this.closeDialog();
        }
        if (this.pageType === 'edit') {
            // Mock update operation for static data
            console.log('Updating program:', program);
            this.closeDialog();
        }
    }

    closeDialog() {
        this.dialogRef?.close();
    }
}