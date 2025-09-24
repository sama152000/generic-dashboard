import { Routes } from '@angular/router';
import { AddEditDepartmentComponent } from './Components/add-edit-department/add-edit-department.component';
import { DepartmentsComponent } from './pages/Departments/Departments.component';
import { AddDepartmentFeaturesComponent } from './Components/add-department-features/add-department-features.component';

export const DepartmentsRoutes: Routes = [
    {
        path: '',
        component: DepartmentsComponent
    },
    {
        path: 'add',
        component: AddEditDepartmentComponent
    },
    {
        path: 'edit/:id',
        component: AddEditDepartmentComponent
    },
    {
        path: 'features',
        component: AddDepartmentFeaturesComponent
    }
];