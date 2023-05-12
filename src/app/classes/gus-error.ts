import { IGusError } from '../types/gus-error';

export class GusError extends Error {
  code: string;
  msgPl: string;
  msgEn: string;

  constructor(error: IGusError) {
    super(error.errorMessageEn);

    this.code = error.errorCode;
    this.msgPl = error.errorMessagePl;
    this.msgEn = error.errorMessageEn;
  }

  static isGusError(error: any): error is GusError {
    return error instanceof GusError;
  }
}
