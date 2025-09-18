import { Routes } from '@angular/router';
import { AddEditMediaComponent } from './Components/add-edit-media/add-edit-media.component';
import { MediaComponent } from './pages/media/media.component';

export const MediaRoutes: Routes = [
    {
        path: '',
        component: MediaComponent
    },
    {
        path: 'add',
        component: AddEditMediaComponent
    },
    {
        path: 'edit/:id',
        component: AddEditMediaComponent
    }
];
