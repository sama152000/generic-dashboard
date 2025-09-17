import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isAuthorized(data: any): boolean {
    // Implement authorization logic based on data
    // For now, return true
    return true;
  }
}
