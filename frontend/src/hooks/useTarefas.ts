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
        setTarefas(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function adicionarTarefa(novaTarefa: { titulo: string; descricao?: string }) {
    setLoading(true);
    try {
      const tarefaCriada = await criarTarefa(novaTarefa);
      setTarefas((prevTarefas) => [...prevTarefas, tarefaCriada]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function editarTarefa(id: string, tarefaAtualizada: { titulo: string; descricao?: string }) {
    setLoading(true);
    try {
      const tarefaEditada = await atualizarTarefa(id, tarefaAtualizada);
      setTarefas((prevTarefas) =>
        prevTarefas.map((tarefa) => (tarefa.id === id ? { ...tarefa, ...tarefaEditada } : tarefa))
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function removerTarefa(id: string) {
    setLoading(true);
    try {
      await deletarTarefa(id);
      setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { tarefas, loading, error, adicionarTarefa, editarTarefa, removerTarefa };
}
