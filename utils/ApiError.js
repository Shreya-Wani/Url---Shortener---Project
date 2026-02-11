const ApiError = class extends Error {
    constructor(statusCode, message = "Something went wrong", error = []) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = error;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;