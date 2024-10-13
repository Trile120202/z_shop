import {StatusCode} from "@/lib/statusCodes";

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export function transformResponse<T>(
    data: T,
    statusCode: number = StatusCode.OK,
    message: string = 'Request was successful'
): ApiResponse<T> {
    return {
        status: statusCode,
        message,
        data,
    };
}
