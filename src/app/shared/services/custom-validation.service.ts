import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  arabicNamePatternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const arabicNamePattern = /^[\u0600-\u06FF\s]+$/;
      const isValid = arabicNamePattern.test(control.value);
      return isValid ? null : { arabicNamePattern: { value: control.value } };
    };
  }

  englishNamePatternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const englishNamePattern = /^[a-zA-Z\s]+$/;
      const isValid = englishNamePattern.test(control.value);
      return isValid ? null : { englishNamePattern: { value: control.value } };
    };
  }

  matchPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { matchPassword: true };
    }
    return null;
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const isValid = passwordPattern.test(control.value);
      return isValid ? null : { passwordPattern: { value: control.value } };
    };
  }

  emailValidator(control: AbstractControl, userId?: string): Observable<ValidationErrors | null> {
    return of(null); // Placeholder, implement actual async validation if needed
  }

  nationalIdValidator(control: AbstractControl, userId?: string): Observable<ValidationErrors | null> {
    return of(null); // Placeholder, implement actual async validation if needed
  }
}
