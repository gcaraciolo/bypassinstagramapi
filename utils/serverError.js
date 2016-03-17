var serverError = {

	unknownError: 		errorResponse(1000, "Unknown error"),
	badUrlRequest: 		errorResponse(1001, "por favor, coloque o nome do usuário que deseja obter os dados na url"),
	notAllowedError: 	errorResponse(1002, 'nao temos permissao para ver esse perfil'),
	userNotFound: 		errorResponse(1003, 'usuario nao encontrado'),
	tooManyUsers:    	errorResponse(1004, 'mais de um usuário encontrado. Por favor, informe o nome exato do perfil.'),
};

function errorResponse(code, message) {
	return { responseCode : code, responseMessage: message};
}

module.exports = serverError;
