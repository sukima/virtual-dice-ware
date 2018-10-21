import EmberError from '@ember/error';

export default class ApplicationError extends EmberError {
  constructor(message) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export function isApplicationError(error) {
  return error instanceof ApplicationError;
}
