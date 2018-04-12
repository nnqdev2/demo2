import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'invalidPhone': 'Invalid phone number'
        };
        return config[validatorName];
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        // tslint:disable-next-line:max-line-length
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static phoneValidator(control) {
      // if (control.value.match(('[0-9]{0-10}'))) {
      if (control.value.match(('/^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/'))) {
          return null;
      } else {
          return { 'invalidPhoneNumber': true };
      }
  }
}
