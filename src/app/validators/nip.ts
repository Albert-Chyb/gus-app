import { ValidatorFn } from '@angular/forms';

/**
 * Validates a NIP.
 * 
 * @param nip A text that should be validated as NIP
 * @returns True if the NIP is valid, false otherwise
 */
export function isNIPValid(nip: string): boolean {
  const nipLengthRegex = /^[0-9]{10}$/;

  // Check if NIP has 10 digits
  if (!nipLengthRegex.test(nip)) {
    return false;
  }

  // Define weights
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

  // Multiply each digit by the corresponding weight and sum the results
  const sum = nip
    .slice(0, 9)
    .split('')
    .reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0);

  // Calculate the remainder of the sum divided by 11
  const remainder = sum % 11;

  // Check if the remainder matches the last digit of the NIP
  const lastDigit = parseInt(nip[9]);

  return remainder === lastDigit;
}

/**
 * Validator for NIP.
 * 
 * @param control Form control
 * @returns Errors object if the NIP is invalid, null otherwise
 */
export const NIPValidator: ValidatorFn = (control) => {
  if (control.value) {
    return isNIPValid(control.value) ? null : { isNIPInvalid: true };
  }

  return null;
};
