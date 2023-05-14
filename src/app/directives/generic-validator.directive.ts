import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appGenericValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: GenericValidatorDirective,
      multi: true,
    },
  ],
})
export class GenericValidatorDirective {
  @Input('appGenericValidator') validators: ValidatorFn[] = [];

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!this.validators || this.validators.length === 0) {
      return null; // No validators provided, return valid
    }

    for (const validator of this.validators) {
      const validationResult = validator(control);

      if (validationResult) {
        return validationResult; // Validation failed, return error object
      }
    }

    return null; // All validations passed, return valid
  }
}
