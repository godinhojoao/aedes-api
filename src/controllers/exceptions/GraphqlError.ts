type GraphqlErrorLocation = {
  line: number;
  column: number;
};

type GraphqlOriginalError = {
  error: string;
  message: string[];
  statusCode: number;
};

export type ExternalGraphqlError = {
  message: string;
  locations: GraphqlErrorLocation[];
  path: string[];
  extensions: { code: string; originalError: GraphqlOriginalError };
};

export class GraphqlError {
  public message: string;
  public path: string[];
  public code: string;
  public detailedMessage?: string;

  constructor(error: ExternalGraphqlError) {
    this.message = error.message;
    this.path = error.path;
    this.code = error.extensions.code;

    if (error?.extensions?.originalError?.message[0]) {
      const errorMessage = error.extensions.originalError.message;
      this.detailedMessage =
        typeof errorMessage === 'string' ? errorMessage : errorMessage[0];
    }
  }
}
