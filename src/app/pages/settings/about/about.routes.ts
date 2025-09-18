import { Routes } from '@angular/router';
import { AboutComponent } from './Pages/about/about.component';
import { AddEditAboutComponent } from './Components/add-edit-about/add-edit-about.component';

export const AboutRoutes: Routes = [
    {
        path: '',
        component: AboutComponent
    },
    {
        path: 'add',
        component: AddEditAboutComponent
    },
    {
        path: 'edit/:id',
        component: AddEditAboutComponent
    }
];
