import { Routes } from '@angular/router';
import { AddEditCustomPagesComponent } from './components/add-edit-custom-pages/add-edit-custom-pages.component';
import { CustomPagesComponent } from './pages/custom-pages/custom-pages.component';

export const CustomPagesRoutes: Routes = [
    {
        path: '',
        component: CustomPagesComponent
    },
    {
        path: 'add',
        component: AddEditCustomPagesComponent
    },
    {
        path: 'edit/:id',
        component: AddEditCustomPagesComponent
    }
];
