export enum HttpTypes {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

export enum HttpStatusCodes {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    RATELIMIT = 429,
    INTERNAL_SERVER_ERROR = 500,
}

export type StatusCodes = HttpStatusCodes;
export default StatusCodes;
