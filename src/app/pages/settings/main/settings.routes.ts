import { Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddEditSettingsComponent } from './components/add-edit-settings/add-edit-settings.component';

export const SettingsRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent
    },
    {
        path: 'add',
        component: AddEditSettingsComponent
    },
    {
        path: 'edit/:id',
        component: AddEditSettingsComponent
    }
];
