import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'الرئيسية',
                items: [
                    { label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'الإعدادات',
                icon: 'pi pi-fw pi-spin pi-cog',
                items: [
                    {
                        label: 'نظرة عامة',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: ['/pages/settings/overview']
                    },
                    {
                        label: 'إدارة الهيرو',
                        icon: 'pi pi-fw pi-sliders-h',
                        routerLink: ['/pages/settings/hero-management']
                    },
                    {
                        label: 'الصفحات',
                        icon: 'pi pi-fw pi-folder',
                        items: [
                            {
                                label: 'من نحن',
                                icon: 'pi pi-fw pi-info-circle',
                                routerLink: ['/pages/settings/pages/about']
                            },
                            {
                                label: 'الأقسام',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/pages/settings/pages/departments']
                            },
                            {
                                label: 'الموظفون',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/pages/settings/pages/staff']
                            },
                            {
                                label: 'القطاعات',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/pages/settings/pages/sectors']
                            }
                        ]
                    },
                    {
                        label: 'المنشورات',
                        icon: 'pi pi-fw pi-megaphone',
                        items: [
                            {
                                label: 'الأخبار',
                                icon: 'pi pi-fw pi-megaphone',
                                routerLink: ['/pages/settings/posts/news']
                            }
                        ]
                    },
                    {
                        label: 'الصفحات المخصصة',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'الصفحات المخصصة',
                                icon: 'pi pi-fw pi-file',
                                routerLink: ['/pages/settings/custom-pages']
                            },
                            {
                                label: 'المسودات',
                                icon: 'pi pi-fw pi-file',
                                routerLink: ['/pages/settings/custom-pages/drafts']
                            },
                            {
                                label: 'الصفحات المنشورة',
                                icon: 'pi pi-fw pi-file',
                                routerLink: ['/pages/settings/custom-pages/published']
                            }
                        ]
                    },
                    {
                        label: 'الوسائط',
                        icon: 'pi pi-fw pi-images',
                        routerLink: ['/pages/settings/media']
                    },
                    {
                        label: 'القوائم',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: ['/pages/settings/menus']
                    },
                    {
                        label: 'الإعدادات',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/pages/settings']
                    }
                ]
            },
            {
                label: 'الشاشات',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'الأصناف',
                        icon: 'pi pi-fw pi-tags',
                        routerLink: ['/pages/items']
                    }
                ]
            }
        ];
    }
}