import { Tarefa } from "../../domain/entities/Tarefa";

export class TarefaUseCases {
  private tarefas: Tarefa[] = [];

  criarTarefa(titulo: string, descricao?: string): Tarefa {
    const novaTarefa: Tarefa = {
      id: Math.random().toString(36).substring(7),
      titulo,
      descricao,
      dataCriacao: new Date(),
    };
    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  listarTarefas(): Tarefa[] {
    return this.tarefas;
  }

  atualizarTarefa(id: string, titulo: string, descricao?: string): Tarefa | null {
    const tarefa = this.tarefas.find((t) => t.id === id);
    if (!tarefa) return null;

    tarefa.titulo = titulo;
    tarefa.descricao = descricao ?? tarefa.descricao;
    return tarefa;
  }

  deletarTarefa(id: string): boolean {
    const index = this.tarefas.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tarefas.splice(index, 1);
    return true;
  }
}
