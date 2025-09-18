import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { StorageService } from '../../services/storage/storage.service';
import { StorageKeys } from '../../enums/storage-keys';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getItemFromSessionStorage(StorageKeys.AccessToken);
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      'Accept-Language': 'en'
    }
  });

  return next(req);
};
