import { Tarefa } from "../../domain/entities/Tarefa";
import { TRPCError } from "@trpc/server";

export class TarefaUseCases {
  private tarefas: Tarefa[] = [];

  criarTarefa(titulo: string, descricao?: string) {
    if (!titulo) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "O título da tarefa é obrigatório.",
      });
    }

    const novaTarefa: Tarefa = {
      id: Math.random().toString(36).substring(7),
      titulo,
      descricao,
      dataCriacao: new Date(),
    };

    this.tarefas.push(novaTarefa);

    return {
      success: true,
      message: "Tarefa criada com sucesso!",
      tarefa: novaTarefa,
    };
  }

  listarTarefas() {
    return {
      success: true,
      message: "Lista de tarefas carregada com sucesso!",
      tarefas: this.tarefas,
    };
  }

  atualizarTarefa(id: string, titulo: string, descricao?: string) {
    const tarefa = this.tarefas.find((t) => t.id === id);
    if (!tarefa) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `A tarefa com ID ${id} não foi encontrada.`,
      });
    }

    if (!titulo) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "O título da tarefa não pode estar vazio.",
      });
    }

    tarefa.titulo = titulo;
    tarefa.descricao = descricao ?? tarefa.descricao;

    return {
      success: true,
      message: "Tarefa atualizada com sucesso!",
      tarefa,
    };
  }

  deletarTarefa(id: string) {
    const index = this.tarefas.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `A tarefa com ID ${id} não foi encontrada.`,
      });
    }

    this.tarefas.splice(index, 1);

    return {
      success: true,
      message: "Tarefa deletada com sucesso!",
    };
  }
}
