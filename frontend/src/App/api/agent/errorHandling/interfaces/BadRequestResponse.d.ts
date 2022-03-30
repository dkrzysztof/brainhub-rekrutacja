export interface BadRequestResponse<T> {
	error: string;
	message: string[];
	statusCode: number;
}
