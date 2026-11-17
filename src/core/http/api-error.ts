export function translateApiError(message?: string): string {
  if (!message) {
    return 'Ocorreu um erro ao comunicar com o servidor.';
  }

  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes('unauthorized') ||
    normalizedMessage.includes('unauthenticated')
  ) {
    return 'Sua sessão expirou. Faça login novamente.';
  }

  if (normalizedMessage.includes('forbidden')) {
    return 'Você não tem permissão para realizar esta ação.';
  }

  if (
    normalizedMessage.includes('not found') ||
    normalizedMessage.includes('não encontrado')
  ) {
    return 'O recurso solicitado não foi encontrado.';
  }

  return message;
}
