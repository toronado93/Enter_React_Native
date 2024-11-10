export class CustomErrorExceptioner extends Error {
  readonly errorCode: number;

  // A static map for custom error messages
  private static errorMessages: Record<number, string> = {
    400: "Bad request. Please check your input.",
    401: "Unauthorized. Please log in to access this feature.",
    403: "Access denied. You don’t have permission to perform this action.",
    404: "Resource not found. The item you’re looking for doesn’t exist.",
    409: "User already exists.",
    500: "Internal server error. Please try again later.",
  };

  constructor(error: any) {
    // Pass the error message to the base Error class
    super(error?.message || "An unknown error occurred");
    this.name = "CustomErrorExceptioner";

    // Assign error code if available, default to 0
    this.errorCode = error?.code || 0;

    // Capture the stack trace (for debugging purposes)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomErrorExceptioner);
    }
  }
  // Method to get a user-friendly error message based on the error code
  handleError(): string {
    return CustomErrorExceptioner.errorMessages[this.errorCode] || this.message;
  }
  logError(): void {
    console.error(`Error ${this.errorCode}: ${this.handleError()}`);
    // Here you could add code to send the error to an external logging service like Sentry
  }
}
