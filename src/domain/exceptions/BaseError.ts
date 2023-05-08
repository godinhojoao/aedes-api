import { ErrorConstraint } from './ErrorConstraint';

type DefaultError = {
  name: string;
  message: string;
  constraints: ErrorConstraint;
};

export abstract class BaseError {
  public name: string;
  public message: string;
  public constraints: ErrorConstraint;

  constructor(error: DefaultError) {
    this.name = error.name;
    this.message = error.message;
    this.constraints = error.constraints;
  }
}
