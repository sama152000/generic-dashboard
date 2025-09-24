import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { DepartmentsService } from '../../../../../shared/services/settings/departments/departments.service';
import { BaseComponent } from '../../../../../base/components/base-component';
import { ProgramListComponent } from '../program-list/program-list.component';
import { FacultyListComponent } from '../faculty-list/faculty-list.component';
import { ActivityListComponent } from '../activity-list/activity-list.component';
import { Department } from '../../../../models/department-dto';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-department-features',
    standalone: true,
    imports: [RouterModule, CardModule, TabsModule, SelectModule, FormsModule, AsyncPipe, ProgramListComponent, FacultyListComponent, ActivityListComponent],
    templateUrl: './add-department-features.component.html',
    styleUrl: './add-department-features.component.css'
})
export class AddDepartmentFeaturesComponent extends BaseComponent implements OnInit {
    departmentsService = inject(DepartmentsService);
    selectedDepartment: Department | null = null;
    departments$!: Observable<Department[]>;

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.departments$ = this.departmentsService.getStaticDepartments();
    }
}