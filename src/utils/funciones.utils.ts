export const obtenerFechaLocal = () => {
	var local = new Date();
	local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
	return local.toJSON();
};

export const obtenerArchivoError = (error: any) => {
	const stackTrace = error.stack;
	const fileNameMatches = stackTrace.match(/at\s+.+\((.+):\d+:\d+\)/);

	if (fileNameMatches && fileNameMatches.length > 1) {
		const fileName = fileNameMatches[1];
		return fileName;
	} else {
		return "";
	}
};
