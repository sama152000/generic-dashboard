import { Routes } from '@angular/router';
import { AddEditDepartmentComponent } from './Components/add-edit-department/add-edit-department.component';
import { DepartmentComponent } from './pages/Departments/Departments.component';

export const DepartmentsRoutes: Routes = [

    {
        path: '',
        component: DepartmentComponent
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
