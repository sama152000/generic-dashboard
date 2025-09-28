import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule],
    styles: [`
        .modern-topbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 4.5rem !important;
            z-index: 1000 !important;
            background: linear-gradient(135deg, #1F2937 0%, #374151 100%) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
        }
        .topbar-container {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            height: 100% !important;
            padding: 0 1.5rem !important;
        }
        .topbar-left {
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
        }
        .topbar-right {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
        }
        .action-buttons {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
        }
        .action-btn {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 2.5rem !important;
            height: 2.5rem !important;
            border: none !important;
            background: transparent !important;
            border-radius: 0.75rem !important;
            color: rgba(255, 255, 255, 0.8) !important;
            cursor: pointer !important;
        }
        .action-btn:hover {
            background: #ffffff !important;
            color: var(--primary-color) !important;
        }
        .brand-logo {
            display: flex !important;
            align-items: center !important;
            text-decoration: none !important;
            color: inherit !important;
        }
        .logo-container {
            display: flex !important;
            align-items: center !important;
            gap: 0.75rem !important;
            flex-shrink: 0 !important;
        }
        .logo-img {
            width: 2.5rem !important;
            height: 2.5rem !important;
            border-radius: 0.75rem !important;
            object-fit: cover !important;
            border: 2px solid #e2e8f0 !important;
            display: block !important;
        }
        .logo-content {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.125rem !important;
        }
        .logo-title {
            font-size: 1.125rem !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            line-height: 1.2 !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
        }
        .logo-subtitle {
            font-size: 0.75rem !important;
            color: rgba(255, 255, 255, 0.8) !important;
            font-weight: 500 !important;
            line-height: 1 !important;
        }
        .menu-toggle-btn {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 2.5rem !important;
            height: 2.5rem !important;
            border: none !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border-radius: 0.75rem !important;
            color: #ffffff !important;
            cursor: pointer !important;
        }
        .menu-toggle-btn:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            color: #ffffff !important;
        }
        .menu-icon {
            font-size: 1.125rem !important;
        }
        .notification-badge,
        .message-badge {
            position: absolute !important;
            top: 0.25rem !important;
            right: 0.25rem !important;
            min-width: 1.25rem !important;
            height: 1.25rem !important;
            background: #ef4444 !important;
            color: white !important;
            font-size: 0.625rem !important;
            font-weight: 600 !important;
            border-radius: 0.625rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border: 2px solid #ffffff !important;
        }
        .message-badge {
            background: #3b82f6 !important;
        }
    `],
    template: `<div class="modern-topbar" dir="rtl">
        <div class="topbar-container">
            <!-- Left Section: Logo & Menu Toggle -->
            <div class="topbar-left">
                <button class="menu-toggle-btn" (click)="layoutService.onMenuToggle()" aria-label="Toggle Menu">
                    <i class="pi pi-bars menu-icon"></i>
                </button>
                <a class="brand-logo" routerLink="/">
                    <div class="logo-container">
                        <img src="./assets/universitylogo.jpg" alt="Logo" class="logo-img" />
                        <div class="logo-content">
                            <span class="logo-title">جامعة الأقصر</span>
                            <span class="logo-subtitle">نظام إدارة المعلومات</span>
                        </div>
                    </div>
                </a>
            </div>

            <!-- Center Section: Search (Optional) -->
            <div class="topbar-center">
                <div class="search-container">
                    <i class="pi pi-search search-icon"></i>
                    <input type="text" class="search-input" placeholder="البحث..." />
                </div>
            </div>

            <!-- Right Section: Actions & User Menu -->
            <div class="topbar-right">
                <div class="action-buttons">
                    <!-- Notification -->
                    <button class="action-btn notification-btn" aria-label="الإشعارات">
                        <div class="hover-shine"></div>
                        <i class="pi pi-bell notification-icon"></i>
                        <span class="notification-badge">3</span>
                    </button>

                    <!-- Messages -->
                    <button class="action-btn message-btn" aria-label="الرسائل">
                        <div class="hover-shine"></div>
                        <i class="pi pi-envelope message-icon"></i>
                        <span class="message-badge">2</span>
                    </button>

                    <!-- Theme Toggle -->
                    <button class="action-btn theme-btn" (click)="toggleDarkMode()" aria-label="تبديل المظهر">
                        <div class="hover-shine"></div>
                        <i class="pi" [ngClass]="layoutService.isDarkTheme() ? 'pi-moon' : 'pi-sun'"></i>
                    </button>

                    <!-- Settings -->
                    <button class="action-btn settings-btn" aria-label="الإعدادات">
                        <div class="hover-shine"></div>
                        <i class="pi pi-cog"></i>
                    </button>

                    <!-- User Profile -->
                    <div class="user-profile">
                        <button class="user-btn" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                            <img src="./assets/user.png" alt="User" class="user-avatar" />
                            <div class="user-info">
                                <span class="user-role">مدير النظام</span>
                            </div>
                            <i class="pi pi-chevron-down user-dropdown-icon"></i>
                        </button>

                        <!-- User Dropdown Menu -->
                        <div class="user-dropdown">
                            <div class="dropdown-header">
                                <div class="user-profile-info">
                                    <img src="/assets/img/logo.jpg" alt="User" class="profile-avatar" />
                                    <div class="profile-details">
                                        <span class="profile-name">أحمد محمد</span>
                                        <span class="profile-email">ahmed@luxor.edu</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-item">
                                    <i class="pi pi-user"></i>
                                    <span>الملف الشخصي</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <i class="pi pi-cog"></i>
                                    <span>الإعدادات</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <i class="pi pi-calendar"></i>
                                    <span>التقويم</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <i class="pi pi-bell"></i>
                                    <span>الإشعارات</span>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item logout">
                                    <i class="pi pi-sign-out"></i>
                                    <span>تسجيل الخروج</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}