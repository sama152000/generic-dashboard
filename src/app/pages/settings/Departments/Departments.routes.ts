import { Routes } from '@angular/router';
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';

export const DepartmentsRoutes: Routes = [
    {
        path: '',
        component: AddEditDepartmentComponent
    },
    {
        path: 'add',
        component: AddEditDepartmentComponent
    },
    {
        path: 'edit/:id',
        component: AddEditDepartmentComponent
    }
];
