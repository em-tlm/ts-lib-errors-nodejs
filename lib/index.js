const elv = require('elv');


const defaultMessage = {
  msgStr: 'The "message" argument must be a string',
  featureDisabled: 'The requested feature is not enabled for the associated customer',
  format: 'The request format was invalid.',
  validation: 'Validation failed.',
  credentials: 'The provided user credentials are invalid.',
  unauthorized: 'The user is not authorized to perform the requested action.',
  notFound: 'The requested item was not found.',
  exists: 'Object already exists.',
  concurrency: 'The provided version does match the current value.',
  tempUnavailable: 'The requested resource is temporarily unavailable.',
};

function formatErrorData(data) {
  if (data.isJoi) {
    const errors = [];
    const details = data.details;

    for (let i = 0; i < details.length; i++) {
      const error = details[i];
      errors.push({
        message: error.message,
        path: `/${error.path.replace(/\./g, '/')}`,
        type: error.type,
      });
    }

    return errors;
  }

  return data;
}

function coalesceArguments(length, defaultMsg, message, data) {
  const result = {
    message: defaultMsg,
    data,
  };

  if (length === 0) return result;

  if (length === 1) {
    if (typeof message === 'string') result.message = message;
    else result.data = formatErrorData(message);
    return result;
  }

  if (elv(message) && typeof message !== 'string') {
    throw new TypeError(defaultMessage.msgStr);
  }

  result.message = elv.coalesce(message, defaultMsg);
  result.data = formatErrorData(data);

  return result;
}

/*
  NOTE: ES6's class notation with extends Error is problematic.  Hence, the
  usage of the "old fashioned way."
*/

/**
  FormatError
*/
function FormatError(message, data) {
  Error.captureStackTrace(this, FormatError);
  const result = coalesceArguments(arguments.length, defaultMessage.format, message, data);
  this.message = result.message;
  this.data = result.data;
  this.name = 'FormatError';
}
FormatError.defaultMessage = defaultMessage.format;
FormatError.prototype = Object.create(Error.prototype);
FormatError.prototype.constructor = FormatError;

/**
  ValidationError
*/
function ValidationError(message, data) {
  Error.captureStackTrace(this, ValidationError);
  const result = coalesceArguments(arguments.length, defaultMessage.validation, message, data);
  this.message = result.message;
  this.data = result.data;
  this.name = 'ValidationError';
}
ValidationError.defaultMessage = defaultMessage.validation;
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

/**
  CredentialsError
*/
function CredentialsError(message, data) {
  Error.captureStackTrace(this, CredentialsError);
  const result = coalesceArguments(arguments.length, defaultMessage.credentials, message, data);
  this.message = result.message;
  this.data = result.data;
  this.name = 'CredentialsError';
}
CredentialsError.defaultMessage = defaultMessage.credentials;
CredentialsError.prototype = Object.create(Error.prototype);
CredentialsError.prototype.constructor = CredentialsError;

/**
  UnauthorizedError
*/
function UnauthorizedError(message, data) {
  Error.captureStackTrace(this, UnauthorizedError);
  const result = coalesceArguments(arguments.length, defaultMessage.unauthorized, message, data);
  this.message = result.message;
  this.data = result.data;
  this.name = 'UnauthorizedError';
}
UnauthorizedError.defaultMessage = defaultMessage.unauthorized;
UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;

/**
  NotFoundError
*/
function NotFoundError(message, data) {
  Error.captureStackTrace(this, NotFoundError);
  const result = coalesceArguments(arguments.length, defaultMessage.notFound, message, data);
  this.message = result.message;
  this.data = result.data;
  this.name = 'NotFoundError';
}
NotFoundError.defaultMessage = defaultMessage.notFound;
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

/**
  ExistsError
*/
function ExistsError(message, data) {
  Error.captureStackTrace(this, ExistsError);
  const result = coalesceArguments(arguments.length, defaultMessage.exists, message, data);
  this.message = result.message;
  this.data = result.data;
  this.name = 'ExistsError';
}
ExistsError.defaultMessage = defaultMessage.exists;
ExistsError.prototype = Object.create(Error.prototype);
ExistsError.prototype.constructor = ExistsError;

/**
  ConcurrencyError
*/
function ConcurrencyError(message, data) {
  Error.captureStackTrace(this, ConcurrencyError);
  const result = coalesceArguments(arguments.length, defaultMessage.concurrency, message, data);
  this.message = result.message;
  this.data = result.data;
  this.name = 'ConcurrencyError';
}
ConcurrencyError.defaultMessage = defaultMessage.concurrency;
ConcurrencyError.prototype = Object.create(Error.prototype);
ConcurrencyError.prototype.constructor = ConcurrencyError;

/**
  TempUnavailableError
*/
function TempUnavailableError(message, data) {
  Error.captureStackTrace(this, TempUnavailableError);
  const result = coalesceArguments(arguments.length, defaultMessage.tempUnavailable, message, data);
  this.message = result.message;
  this.data = result.data;
  this.name = 'TempUnavailableError';
}
TempUnavailableError.defaultMessage = defaultMessage.tempUnavailable;
TempUnavailableError.prototype = Object.create(Error.prototype);
TempUnavailableError.prototype.constructor = TempUnavailableError;


module.exports = {
  FormatError,
  ValidationError,
  CredentialsError,
  UnauthorizedError,
  NotFoundError,
  ExistsError,
  ConcurrencyError,
  TempUnavailableError,
};