import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, inject, provideAppInitializer, InjectionToken } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { HttpBackend, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfigService, errorInterceptor, loadingInterceptor, LoadingNgxSpinnerInterceptor } from './app/core';
/* Removed ngx-translate imports as project will be English only */
// import { TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { environment } from './environments/environment';
import { providePrimeNG } from 'primeng/config';
import { yellowPreset } from './app/core/themes/primeng-presets/custom-preset';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
const ApiConfiguration = new InjectionToken('ApiConfiguration');

const initializerConfigFn = (): any => {
    const configService = inject(ConfigService);
    return configService.loadAppConfig();
};


export const appConfig: ApplicationConfig = {
    providers: [
        provideAppInitializer(initializerConfigFn),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        provideAnimations(),
        DialogService,
        DynamicDialogRef,
        DynamicDialogConfig,
        { provide: ApiConfiguration, useValue: { rootUrl: environment.HOST_API } },
        provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor, LoadingNgxSpinnerInterceptor])),
        /* Removed TranslateModule.forRoot to disable translation */
        // importProvidersFrom([
        //     TranslateModule.forRoot({
        //         defaultLanguage: environment.defaultLanguage
        //     })
        // ]),
        provideRouter(appRoutes, withViewTransitions()),
        providePrimeNG({
            theme: {
                preset: yellowPreset,
                options: {
                    darkModeSelector: false || 'none'
                }
            },
            ripple: true
        }),
        provideToastr({
            toastClass: 'ngx-toastr',
            onActivateTick: true,
            maxOpened: 1,
            autoDismiss: true
        })
    ]
};
