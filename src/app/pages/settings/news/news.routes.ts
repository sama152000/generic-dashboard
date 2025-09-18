import { Routes } from '@angular/router';
import { AddEditNewsComponent } from './Components/add-edit-news/add-edit-news.component';
import { NewsComponent } from './pages/news/news.component';

export const NewsRoutes: Routes = [
    {
        path: '',
        component: NewsComponent
    },
    {
        path: 'add',
        component: AddEditNewsComponent
    },
    {
        path: 'edit/:id',
        component: AddEditNewsComponent
    }
];
