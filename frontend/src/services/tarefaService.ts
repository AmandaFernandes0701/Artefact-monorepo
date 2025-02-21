import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../backend/src/server';

const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

export const listarTarefas = async () => {
  return await trpcClient.tarefa.listar.query();
};

export const criarTarefa = async (tarefa: { titulo: string; descricao?: string }) => {
  return await trpcClient.tarefa.criar.mutate(tarefa);
};

export const atualizarTarefa = async (id: string, tarefa: { titulo: string; descricao?: string }) => {
  return await trpcClient.tarefa.atualizar.mutate({ id, ...tarefa });
};

export const deletarTarefa = async (id: string) => {
  return await trpcClient.tarefa.deletar.mutate({ id });
};
