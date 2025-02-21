import { useState, useEffect } from 'react';
import { criarTarefa, listarTarefas, atualizarTarefa, deletarTarefa } from '../services/tarefaService';
import { Tarefa } from '../models/Tarefa';

export function useTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await listarTarefas();
        setTarefas(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function adicionarTarefa(novaTarefa: { titulo: string; descricao?: string }): Promise<Tarefa> {
    setLoading(true);
    try {
      const response = await criarTarefa(novaTarefa);
      const tarefaCriada: Tarefa = response.tarefa;
      setTarefas(prevTarefas => [...prevTarefas, tarefaCriada]);
      return tarefaCriada;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function editarTarefa(id: string, tarefaAtualizada: { titulo: string; descricao?: string }): Promise<void> {
    setLoading(true);
    try {
      const response = await atualizarTarefa(id, tarefaAtualizada);
      const tarefaEditada: Tarefa = response.tarefa;
      setTarefas(prevTarefas =>
        prevTarefas.map(tarefa => (tarefa.id === id ? tarefaEditada : tarefa))
      );
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function removerTarefa(id: string): Promise<void> {
    setLoading(true);
    try {
      await deletarTarefa(id);
      setTarefas(prevTarefas => prevTarefas.filter(tarefa => tarefa.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { tarefas, loading, error, adicionarTarefa, editarTarefa, removerTarefa };
}
