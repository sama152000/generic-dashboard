import { Routes } from '@angular/router';
import { HeroComponent } from './Pages/Hero/Hero.component';
import { AddEditHeroComponent } from './Components/add-edit-Hero/add-edit-Hero.component';

export const HeroManagementRoutes: Routes = [
    {
        path: '',
        component: HeroComponent
    },
    {
        path: 'add',
        component: AddEditHeroComponent
    },
    {
        path: 'edit/:id',
        component: AddEditHeroComponent
    }
];
