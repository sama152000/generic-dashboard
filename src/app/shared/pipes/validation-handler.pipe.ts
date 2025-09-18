import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validationHandler',
  standalone: true
})
export class ValidationHandlerPipe implements PipeTransform {

  transform(value: any, customErrorMessage?: any): string {
    value = JSON.stringify(value);

    let res = '';
    let customMessage = '';
    const pattern = /"(.*?)"/;
    const matches = value.match(pattern).length === 0 ? value.match(pattern)[0].replace('"', '') : value.match(pattern)[1];

    if (matches === 'maxlength') {
      customMessage = JSON.parse(value).maxlength.requiredLength;
    } else if (matches === 'minlength') {
      customMessage = JSON.parse(value).minlength.requiredLength;
    } else if (matches === 'max') {
      customMessage = JSON.parse(value).max.max;
    } else if (matches === 'min') {
      customMessage = JSON.parse(value).min.min;
    }
    const customTranslate = customErrorMessage && matches === 'required' ? `${matches}_${customErrorMessage}` : matches;

    // Since translation service is removed, just return the key with custom message
    res = customTranslate.toUpperCase() + (customMessage ? '(' + customMessage + ')' : '');

    return res;
  }
}
