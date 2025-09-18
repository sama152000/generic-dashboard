import { Routes } from '@angular/router';
import { AddEditSectorsComponent } from './components/add-edit-sectors/add-edit-sectors.component';
import { SectorsComponent } from './Pages/sectors/sectors.component';

export const sectorsRoutes: Routes = [
    {
        path: '',
        component: SectorsComponent
    },
    {
        path: 'add',
        component: AddEditSectorsComponent
    },
    {
        path: 'edit/:id',
        component: AddEditSectorsComponent
    }
];
