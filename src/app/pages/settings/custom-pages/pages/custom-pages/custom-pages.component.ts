import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';

import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-custom-pages',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule ],
    templateUrl: './custom-pages.component.html',
    styleUrls: ['./custom-pages.component.css']
})
export class CustomPagesComponent extends BaseEditComponent implements OnInit {
    dialogService: DialogService = inject(DialogService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        // Initialization logic here
    }
}
