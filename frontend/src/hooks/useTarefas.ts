import { useState, useEffect } from 'react';
import { listarTarefas } from '../services/tarefaService';
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

  return { tarefas, loading, error };
}
