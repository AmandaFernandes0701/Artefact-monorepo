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

// ✅ Importe sua interface Tarefa
import { Tarefa } from '../../models/Tarefa'; // Ajuste o caminho conforme necessário

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    minWidth: '600px',
    background: 'transparent',
    border: 'none',
    padding: 0,
  },
};

const TasksListPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  // Em vez de "currentTask", agora "tarefaAtual"
  const [tarefaAtual, setTarefaAtual] = useState<Tarefa | null>(null);
  
  // Renomeamos para refletir os campos da interface Tarefa
  const [modalTitulo, setModalTitulo] = useState('');
  const [modalDescricao, setModalDescricao] = useState('');
  
  // Vamos armazenar as tarefas carregadas do backend aqui
  const [tarefasLocal, setTarefasLocal] = useState<Tarefa[]>([]);

  // Para exclusão
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tarefaADeletar, setTarefaADeletar] = useState<Tarefa | null>(null);

  // Hook que busca as tarefas do backend
  const { tarefas, loading, error } = useTarefas();

  // Quando as tarefas do backend terminam de carregar, atualizamos nosso estado local
  useEffect(() => {
    if (!loading && !error && tarefas) {
      setTarefasLocal(tarefas);
    }
  }, [tarefas, loading, error]);

  useEffect(() => {
    ReactModal.setAppElement(document.body);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Abre modal para criar/editar tarefa
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tarefaAtual) {
      // Aqui você pode implementar a lógica de edição (PUT/PATCH)
      // Por exemplo: editar no backend, depois atualizar o estado local
      // setTarefasLocal(...);
    } else {
      // Aqui você pode implementar a lógica de criação (POST)
      // Por exemplo: criar no backend, depois atualizar o estado local
      // setTarefasLocal(...);
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

  const confirmDelete = () => {
    if (tarefaADeletar) {
      // Aqui você pode implementar a lógica de exclusão (DELETE)
      // Ex.: chamar API e depois remover do estado local
      setTarefasLocal(prev => prev.filter(t => t.id !== tarefaADeletar.id));
    }
    closeDeleteModal();
  };

  const theme = isDarkMode ? { ...darkTheme } : { ...lightTheme };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <h1 style={{ fontWeight: 'bold' }}>Lista de Tarefas</h1>
          <ThemeToggleContainer
            onClick={toggleTheme}
            title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            <MuiIconButton color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </MuiIconButton>
          </ThemeToggleContainer>
        </Header>

        <TaskListContainer>
          {loading && <p>Carregando tarefas...</p>}
          {error && <p>Ocorreu um erro ao carregar as tarefas.</p>}
          {!loading && !error && tarefasLocal.map(tarefa => (
            <TaskItem key={tarefa.id}>
              <div>
                <TaskTitle>{tarefa.titulo}</TaskTitle>
                <TaskDescription>{tarefa.descricao}</TaskDescription>
                <TaskDate>{tarefa.dataCriacao}</TaskDate>
              </div>
              <div>
                <IconButton title="Editar" onClick={() => openTaskModal(tarefa)}>
                  <EditIcon />
                </IconButton>
                <IconButton title="Excluir" onClick={() => openDeleteModal(tarefa)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </TaskItem>
          ))}
        </TaskListContainer>

        <NewTaskButton onClick={() => openTaskModal()}>
          <AddIcon /> Criar Nova Tarefa
        </NewTaskButton>

        <ReactModal isOpen={isTaskModalOpen} onRequestClose={closeTaskModal} style={customStyles}>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{tarefaAtual ? 'Editar Tarefa' : 'Nova Tarefa'}</ModalTitle>
              <ModalCloseButton onClick={closeTaskModal}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="titulo">Título</label>
                  <ModalInput
                    id="titulo"
                    type="text"
                    placeholder="Título"
                    value={modalTitulo}
                    onChange={(e) => setModalTitulo(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="descricao">Descrição</label>
                  <ModalTextarea
                    id="descricao"
                    placeholder="Descrição"
                    value={modalDescricao}
                    onChange={(e) => setModalDescricao(e.target.value)}
                    rows={4}
                  />
                </div>
                <SubmitButton type="submit">
                  {tarefaAtual ? 'Salvar Alterações' : 'Adicionar Tarefa'}
                </SubmitButton>
              </form>
            </ModalBody>
          </ModalContainer>
        </ReactModal>

        <ReactModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} style={customStyles}>
          <ModalContainer>
            <ModalHeader style={{ justifyContent: 'center' }}>
              <ModalTitle>Confirmar exclusão</ModalTitle>
              <ModalCloseButton onClick={closeDeleteModal}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody style={{ textAlign: 'center' }}>
              <p>Tem certeza que deseja apagar essa tarefa?</p>
              <SubmitButton onClick={confirmDelete} style={{ margin: '0 auto' }}>
                Confirmar
              </SubmitButton>
            </ModalBody>
          </ModalContainer>
        </ReactModal>
      </Container>
    </ThemeProvider>
  );
};

export default TasksListPage;
