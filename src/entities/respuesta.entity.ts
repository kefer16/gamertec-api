export class RespuestaEntity {
	code: number;
	data: Array<any>;
	error: ErrorEntity;

	constructor(
		code: number = 0,
		data: Array<any> = [],
		error: ErrorEntity = new ErrorEntity(0, "")
	) {
		this.code = code;
		this.data = data;
		this.error = error;
	}
}

export class ErrorEntity {
	code: number;
	message: string;

	constructor(code: number, message: string) {
		this.code = code;
		this.message = message;
	}
}
