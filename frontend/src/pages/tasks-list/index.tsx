import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import ReactModal from 'react-modal';
import {
  Container,
  Header,
  TaskListContainer,
  TaskItem,
  TaskTitle,
  TaskDescription,
  TaskDate,
  IconButton,
  NewTaskButton,
  ThemeToggleContainer,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalInput,
  ModalTextarea,
  SubmitButton,
} from './tasks-list.styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { darkTheme, lightTheme } from '../../styles/theme';
import AddIcon from '@mui/icons-material/Add';
import { IconButton as MuiIconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTarefas } from '../../hooks/useTarefas';
import { Tarefa } from '../../models/Tarefa';

const TasksListPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState<Tarefa | null>(null);
  const [modalTitulo, setModalTitulo] = useState('');
  const [modalDescricao, setModalDescricao] = useState('');
  const [tarefasLocal, setTarefasLocal] = useState<Tarefa[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tarefaADeletar, setTarefaADeletar] = useState<Tarefa | null>(null);
  const { tarefas, loading, error, adicionarTarefa, editarTarefa, removerTarefa } = useTarefas();

  useEffect(() => {
    if (!loading && !error && tarefas) {
      setTarefasLocal(tarefas);
    }
  }, [tarefas, loading, error]);

  useEffect(() => {
    ReactModal.setAppElement(document.body);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const openTaskModal = (tarefa?: Tarefa) => {
    if (tarefa) {
      setTarefaAtual(tarefa);
      setModalTitulo(tarefa.titulo);
      setModalDescricao(tarefa.descricao ?? '');
    } else {
      setTarefaAtual(null);
      setModalTitulo('');
      setModalDescricao('');
    }
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setTarefaAtual(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tarefaAtual) {
      const updatedTarefa = { ...tarefaAtual, titulo: modalTitulo, descricao: modalDescricao };
      await editarTarefa(tarefaAtual.id, updatedTarefa);
      setTarefasLocal(prev => prev.map(t => (t.id === updatedTarefa.id ? updatedTarefa : t)));
    } else {
      const novaTarefa = await adicionarTarefa({ titulo: modalTitulo, descricao: modalDescricao });
      setTarefasLocal(prev => [...prev, novaTarefa as unknown as Tarefa]);
    }
    closeTaskModal();
  };

  const openDeleteModal = (tarefa: Tarefa) => {
    setTarefaADeletar(tarefa);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTarefaADeletar(null);
  };

  const confirmDelete = async () => {
    if (tarefaADeletar) {
      await removerTarefa(tarefaADeletar.id);
      setTarefasLocal(prev => prev.filter(t => t.id !== tarefaADeletar.id));
    }
    closeDeleteModal();
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <h1>Lista de Tarefas</h1>
          <ThemeToggleContainer onClick={toggleTheme}>
            <MuiIconButton>{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}</MuiIconButton>
          </ThemeToggleContainer>
        </Header>

        <TaskListContainer>
          {loading && <p>Carregando tarefas...</p>}
          {error && <p>Erro ao carregar tarefas.</p>}
          {tarefasLocal.map(tarefa => (
            <TaskItem key={tarefa.id}>
              <div>
                <TaskTitle>{tarefa.titulo}</TaskTitle>
                <TaskDescription>{tarefa.descricao}</TaskDescription>
                <TaskDate>{new Date(tarefa.dataCriacao).toLocaleDateString('pt-BR')}</TaskDate>
              </div>
              <div>
                <IconButton onClick={() => openTaskModal(tarefa)}><EditIcon /></IconButton>
                <IconButton onClick={() => openDeleteModal(tarefa)}><DeleteIcon /></IconButton>
              </div>
            </TaskItem>
          ))}
        </TaskListContainer>

        <NewTaskButton onClick={() => openTaskModal()}><AddIcon /> Criar Nova Tarefa</NewTaskButton>

        <ReactModal isOpen={isTaskModalOpen} onRequestClose={closeTaskModal}>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{tarefaAtual ? 'Editar Tarefa' : 'Nova Tarefa'}</ModalTitle>
              <ModalCloseButton onClick={closeTaskModal}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <label>Título</label>
                <ModalInput value={modalTitulo} onChange={e => setModalTitulo(e.target.value)} required />
                <label>Descrição</label>
                <ModalTextarea value={modalDescricao} onChange={e => setModalDescricao(e.target.value)} rows={4} />
                <SubmitButton type="submit">{tarefaAtual ? 'Salvar' : 'Adicionar'}</SubmitButton>
              </form>
            </ModalBody>
          </ModalContainer>
        </ReactModal>

        <ReactModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal}>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>Confirmar Exclusão</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>Tem certeza que deseja excluir esta tarefa?</p>
              <SubmitButton onClick={confirmDelete}>Excluir</SubmitButton>
            </ModalBody>
          </ModalContainer>
        </ReactModal>
      </Container>
    </ThemeProvider>
  );
};

export default TasksListPage;
