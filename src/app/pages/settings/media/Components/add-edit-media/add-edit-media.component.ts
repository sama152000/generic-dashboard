import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitButtonsComponent } from '../../../../../shared/components/submit-buttons/submit-buttons.component';

import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-media',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule],
    templateUrl: './add-edit-media.component.html',
    styleUrls: ['./add-edit-media.component.css']
})
export class AddEditMediaComponent extends BaseEditComponent implements OnInit {
    dialogService: DialogService = inject(DialogService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        // Initialization logic here
    }
}
