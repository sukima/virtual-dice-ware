import ApplicationError from './application';

export default class MissingWordListError extends ApplicationError {
  constructor(originalError, message = 'Missing word list') {
    super(message);
    this.name = 'MissingWordListError';
    this.originalError = originalError;
  }
}

export function isMissingWordListError(error) {
  return error instanceof MissingWordListError;
}
