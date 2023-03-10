class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
        this.status = 401;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

class NotAllowedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotAllowedError';
        this.status = 403;
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.status = 400;
    }
}
class NotImplementedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotImplementedError';
        this.message = 'Not implemented yet';
        this.status = 501;
    }
}

module.exports = {
    AuthError,
    NotFoundError,
    NotAllowedError,
    BadRequestError,
    NotImplementedError
};
