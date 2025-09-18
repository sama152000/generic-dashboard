import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, BestSellingWidget, RevenueStreamWidget],
    template: `
        <div class="dashboard-container">
            <div class="grid grid-cols-12 dashboard-grid">
                <app-stats-widget class="contents" />
                <div class="col-span-12 xl:col-span-6">
                    <app-best-selling-widget />
                </div>
                <div class="col-span-12 xl:col-span-6">
                    <app-revenue-stream-widget />
                </div>
            </div>
        </div>
    `
})
export class Dashboard {}
