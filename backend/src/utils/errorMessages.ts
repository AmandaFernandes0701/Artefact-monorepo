export const ErrorMessages = {
    NOT_FOUND: (entity: string, id: string) => `${entity} com ID ${id} não encontrado.`,
    DELETE_FAILED: (entity: string) => `Não foi possível deletar o ${entity}. Tente novamente mais tarde.`,
    INVALID_INPUT: (field: string) => `O campo '${field}' é inválido ou faltando.`,
    SERVER_ERROR: () => `Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.`,
    UNAUTHORIZED: () => `Você não tem permissão para realizar essa ação.`,
    ALREADY_EXISTS: (entity: string) => `${entity} já existe.`,
    MISSING_PARAMETERS: (params: string[]) => `Faltam os parâmetros obrigatórios: ${params.join(', ')}`,
    INVALID_ID: () => `ID fornecido é inválido ou não corresponde ao formato esperado.`,
    OPERATION_FAILED: (operation: string) => `A operação de ${operation} falhou. Tente novamente.`,
  };
  