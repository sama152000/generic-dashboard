import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';
import { NewsService } from '../../../../../shared/services/settings/news/news.service';

import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-news',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule],
    templateUrl: './add-edit-news.component.html',
    styleUrls: ['./add-edit-news.component.css']
})
export class AddEditNewsComponent extends BaseEditComponent implements OnInit {
    newsService: NewsService = inject(NewsService);
    dialogService: DialogService = inject(DialogService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        // Initialization logic here
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            title: ['', Validators.required],
            content: ['', Validators.required]
        });
    }

    submit() {
        if (this.pageType === 'add')
            this.newsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.newsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
