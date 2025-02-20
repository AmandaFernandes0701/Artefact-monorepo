import { initTRPC } from "@trpc/server";
import { TarefaUseCases } from "../../application/useCases/TarefaUseCases";
import { z } from "zod";

const t = initTRPC.create();
const tarefaUseCases = new TarefaUseCases();

export const tarefaRouter = t.router({
  criar: t.procedure
    .input(
      z.object({
        titulo: z.string(),
        descricao: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      return tarefaUseCases.criarTarefa(input.titulo, input.descricao);
    }),

  listar: t.procedure.query(() => {
    return tarefaUseCases.listarTarefas();
  }),

  atualizar: t.procedure
    .input(
      z.object({
        id: z.string(),
        titulo: z.string(),
        descricao: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      return tarefaUseCases.atualizarTarefa(
        input.id,
        input.titulo,
        input.descricao
      );
    }),

  deletar: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return tarefaUseCases.deletarTarefa(input.id);
    }),
});