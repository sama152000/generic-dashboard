import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

export default [
    {
        path: 'settings',
        children: [
            {
                path: 'Departments',
                loadChildren: () => import('./settings/Departments/Departments.routes').then((m) => m.DepartmentsRoutes)
            }
        ]
    },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
