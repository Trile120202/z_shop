import {StatusCode} from "@/lib/statusCodes";

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

interface TransformResponseOptions<T> {
    data: T;
    message?: string;
    statusCode?: number;
}

export function transformResponse<T>({
                                         data,
                                         message = 'Request was successful',
                                         statusCode = StatusCode.OK,
                                     }: TransformResponseOptions<T>): ApiResponse<T> {
    return {
        status: statusCode,
        message,
        data,
    };
}
