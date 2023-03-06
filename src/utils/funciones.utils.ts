export const convertirFechaLocal = () => {
	var local = new Date();
	local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
	return local.toJSON();
};
