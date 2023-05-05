import { BaseError } from './BaseError';
import { ErrorConstraint } from './ErrorConstraint';

type ExternalValidationError = {
  property: string;
  value?: any;
  constraints?: ErrorConstraint;
  validExample: any;
  invalidProperties: string[];
};

export class ValidationError extends BaseError {
  public value?: any;
  public validExample: string;
  public invalidProperties: string[];

  constructor(error: ExternalValidationError) {
    super({
      name: 'VALIDATION_EXCEPTION',
      message: `Invalid input for ${error.property} with value ${error.value}`,
      constraints: error.constraints,
    });
    this.value = error.value;
    this.validExample = error.validExample;
    this.invalidProperties = error.invalidProperties;
  }
}
