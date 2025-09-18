import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

const routes: Routes = [
    {
        path: 'settings',
        children: [
            {
                path: 'Overview',
                loadChildren: () => import('./settings/Overview/Overview.routes').then((m) => m.OverviewRoutes)
            },
            {
                path: 'Hero Management',
                loadChildren: () => import('./settings/Hero Management/Hero Management.routes').then((m) => m.HeroManagementRoutes)
            },
            {
                path: 'pages',
                children: [
                    {
                        path: 'about',
                        loadChildren: () => import('./settings/about/about.routes').then((m) => m.AboutRoutes)
                    },
                    {
                        path: 'departments',
                        loadChildren: () => import('./settings/Departments/Departments.routes').then((m) => m.DepartmentsRoutes)
                    },
                    {
                        path: 'staff',
                        loadChildren: () => import('./settings/staff/staff.routes').then((m) => m.StaffRoutes)
                    },
                    {
                        path: 'sectors',
                        loadChildren: () => import('./settings/sectors/sectors.routes').then((m) => m.sectorsRoutes)
                    }
                ]
            },
            {
                path: 'posts',
                children: [
                    {
                        path: 'news',
                        loadChildren: () => import('./settings/news/news.routes').then((m) => m.NewsRoutes)
                    }
                ]
            },
            {
                path: 'custom-pages',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./settings/custom-pages/custom-pages.routes').then((m) => m.CustomPagesRoutes)
                    }
                ]
            },
            {
                path: 'media',
                loadChildren: () => import('./settings/media/media.routes').then((m) => m.MediaRoutes)
            },
            {
                path: 'menus',
                loadChildren: () => import('./settings/menus/menus.routes').then((m) => m.MenusRoutes)
            },
            {
                path: '',
                loadChildren: () => import('./settings/main/settings.routes').then((m) => m.SettingsRoutes)
            }
        ]
    },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
];

export default routes;