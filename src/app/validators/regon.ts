import { ValidatorFn } from '@angular/forms';

/**
 * Validates a REGON.
 *
 * @param regon A text that should be validated as REGON
 * @returns True if the REGON is valid, false otherwise
 */
export function isREGONValid(regon: string) {
  const regonLengthRegex = /^(\d{9}|\d{14})$/;

  // Check if REGON is 9 or 14 digits long
  if (!regonLengthRegex.test(regon)) {
    return false;
  }

  // Define weights based on REGON length
  const weights =
    regon.length === 9
      ? [8, 9, 2, 3, 4, 5, 6, 7]
      : [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];

  // Multiply each digit by the corresponding weight and sum the results
  const sum = regon
    .slice(0, regon.length - 1)
    .split('')
    .reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0);

  // Calculate the remainder of the sum divided by 11
  const remainder = sum % 11;

  // Check if the remainder matches the last digit of the REGON
  const lastDigit = parseInt(regon[regon.length - 1]);

  return remainder === lastDigit;
}

/**
 * Validator for REGON.
 *
 * @param control Form control
 * @returns Errors object if the REGON is invalid, null otherwise
 */
export const REGONValidator: ValidatorFn = (control) => {
  if (control.value) {
    return isREGONValid(control.value) ? null : { isREGONInvalid: true };
  }

  return null;
};
