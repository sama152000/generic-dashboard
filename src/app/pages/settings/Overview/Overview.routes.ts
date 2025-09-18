import { Routes } from '@angular/router';
import { AddEditOverviewComponent } from './components/add-edit-Overview/add-edit-Overview.component';
import { OverviewComponent } from './pages/Overview/Overview.component';

export const OverviewRoutes: Routes = [
    {
        path: '',
        component: OverviewComponent
    },
    {
        path: 'add',
        component: AddEditOverviewComponent
    },
    {
        path: 'edit/:id',
        component: AddEditOverviewComponent
    }
];
