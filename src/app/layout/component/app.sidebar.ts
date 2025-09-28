import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu],
     template: `<div class="layout-sidebar" dir="rtl">
        <div class="sidebar-header">
            <div class="sidebar-brand">
                <i class="pi pi-graduation-cap brand-icon"></i>
                <span class="brand-text">لوحة التحكم</span>
            </div>
        </div>
        <nav class="sidebar-navigation">
            <app-menu></app-menu>
        </nav>
     </div>`
})
export class AppSidebar {
    constructor(public el: ElementRef) {}
}