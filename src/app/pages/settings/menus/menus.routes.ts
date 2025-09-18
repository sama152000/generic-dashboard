import { Routes } from '@angular/router';
import { MenusComponent } from './pages/menus/menus.component';
import { AddEditMenusComponent } from './components/add-edit-menus/add-edit-menus.component';

export const MenusRoutes: Routes = [
    {
        path: '',
        component: MenusComponent
    },
    {
            path: 'add',
            component: AddEditMenusComponent
        },
    {
        path : '',
        component : AddEditMenusComponent
    }
];
