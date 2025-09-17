import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmitButtonsComponent } from '../../../../shared/components/submit-buttons/submit-buttons.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-department',
    standalone: true,
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent],
    templateUrl: './add-edit-department.component.html'
})
export class AddEditDepartmentComponent extends BaseEditComponent implements OnInit {
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

    getEditDepartment = () => {
        this.initFormGroup();
        // this.form.patchValue(department);
    };

    submit() {
        if (this.pageType === 'add') {
            this.closeDialog();
        }
        if (this.pageType === 'edit') {
            this.closeDialog();
        }
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
