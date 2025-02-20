import { Response, Request, NextFunction } from 'express';
import { TRPCError } from '@trpc/server';
import { ErrorMessages } from './errorMessages';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);  // Log do erro para depuração no servidor

  // Se for um erro do tRPC
  if (err instanceof TRPCError) {
    if (err.code === 'BAD_REQUEST' && err.message.includes('Erro de validação')) {
      // Erro de validação, formatado de maneira amigável
      return res.status(400).json({
        success: false,
        message: err.message, // Mensagem de erro formatada
        code: err.code,
      });
    }

    // Para erros do tipo TRPCError que não são de validação
    return res.status(400).json({
      success: false,
      message: err.message || 'Ocorreu um erro no processamento da requisição.',
      code: err.code,
    });
  }

  // Caso contrário, se for um erro genérico
  switch (err.code) {
    case 'NOT_FOUND':
      return res.status(404).json({
        success: false,
        message: ErrorMessages.NOT_FOUND(err.entity, err.id),
      });
    case 'DELETE_FAILED':
      return res.status(500).json({
        success: false,
        message: ErrorMessages.DELETE_FAILED(err.entity),
      });
    case 'INVALID_INPUT':
      return res.status(400).json({
        success: false,
        message: ErrorMessages.INVALID_INPUT(err.field),
      });
    case 'UNAUTHORIZED':
      return res.status(403).json({
        success: false,
        message: ErrorMessages.UNAUTHORIZED(),
      });
    default:
      return res.status(500).json({
        success: false,
        message: ErrorMessages.SERVER_ERROR(),
      });
  }
};
