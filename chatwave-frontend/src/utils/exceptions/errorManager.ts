export enum AuthError {
  UserNotConfirmedException = "UserNotConfirmedException",
  UserNotFoundException = "UserNotFoundException",
  NotAuthorizedException = "NotAuthorizedException",
  UsernameExistsException = "UsernameExistsException",
}

export interface ErrorResponse {
  title?: string;
  message?: string;
}

export class ErrorManager {
  static handle(err: Error): ErrorResponse {
    switch (err.name) {
      case AuthError.UserNotConfirmedException:
        return {
          title: "User is not confirmed",
          message: "You must confirm your email before you can log in",
        };
      case AuthError.UserNotFoundException:
        return {
          title: "User does not exist",
          message: "Please check your email and password an try again",
        };
      case AuthError.NotAuthorizedException:
        return {
          title: "Incorrect username or password",
          message: "Please check your email and password an try again",
        };
      case AuthError.UsernameExistsException:
        return {
          title: "Email already exists",
          message: "Please use a different email to register",
        };
      default:
        return {
          title: "Whoops",
          message: "An unexpected error has occurred",
        };
    }
  }
}
