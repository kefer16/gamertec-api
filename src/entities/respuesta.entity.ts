export class RespuestaEntity<T> {
	constructor(
		public code: number = 0,
		public data: T | null = null,
		public error: ErrorEntity = new ErrorEntity(0, "")
	) {}
}

export class ErrorEntity {
	code: number;
	message: string;

	constructor(code: number, message: string) {
		this.code = code;
		this.message = message;
	}
}
