import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { PrimeInputTextComponent } from '../../../../../shared/components/primeng/p-input-text/p-input-text.component';

import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-departments',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
    templateUrl: './Departments.component.html',
    styleUrls: ['./Departments.component.css']
})
export class DepartmentComponent extends BaseEditComponent implements OnInit {
    departmentsService: DepartmentsService = inject(DepartmentsService);
    dialogService: DialogService = inject(DialogService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditDepartment();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            code: ['', Validators.required],
            nameAr: ['', Validators.required],
            nameEn: ['']
        });
    }

    getEditDepartment() {
        this.departmentsService.getEditDepartments(this.id).subscribe((department: any) => {
            this.initFormGroup();
            this.form.patchValue(department);
        });
    }

    submit() {
        if (this.pageType === 'add')
            this.departmentsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.departmentsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
