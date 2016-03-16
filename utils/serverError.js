var serverError = {

	unknownError: 						errorResponse(1000, "Unknown error"),
	badUrlRequest: 						errorResponse(1001, "por favor, coloque o nome do usuário que deseja obter os dados na url"),

};

function errorResponse(code, message) {
	return { responseCode : code, responseMessage: message};
}

module.exports = serverError;
