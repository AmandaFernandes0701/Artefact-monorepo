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
import {darkTheme,lightTheme} from '../../styles/theme';
import AddIcon from '@mui/icons-material/Add';
import { IconButton as MuiIconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTarefas } from '../../hooks/useTarefas';

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
}

const initialTasks: Task[] = Array.from({ length: 2 }, (_, index) => ({
  id: index + 1,
  title: 'Comprar mantimentos',
  description: 'Leite, pão, ovos e frutas frescas.',
  date: '2025-03-15',
}));

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
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Aqui usamos o hook para buscar as tarefas do backend.
  const { tarefas, loading, error } = useTarefas();

  // Quando os dados forem carregados, vamos imprimir o resultado no console.
  useEffect(() => {
    if (!loading && !error) {
      console.log('Tarefas do backend:', tarefas);
    }
  }, [tarefas, loading, error]);

  useEffect(() => {
    ReactModal.setAppElement(document.body);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const openTaskModal = (task?: Task) => {
    if (task) {
      console.log('Tarefas do backend:', tarefas);
      setCurrentTask(task);
      setModalTitle(task.title);
      setModalDesc(task.description);
    } else {
      setCurrentTask(null);
      setModalTitle('');
      setModalDesc('');
    }
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setCurrentTask(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTask) {
      // console.log('Salvando alterações da tarefa:', modalTitle, modalDesc);
    } else {
      // console.log('Adicionando nova tarefa:', modalTitle, modalDesc);
    }
    closeTaskModal();
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      // console.log('Excluindo tarefa:', taskToDelete);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
    }
    closeDeleteModal();
  };

  const theme = isDarkMode ? { ...darkTheme} : { ...lightTheme };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <h1 style={{ fontWeight: 'bold' }}>Lista de Tarefas</h1>
          <ThemeToggleContainer onClick={toggleTheme} title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}>
            <MuiIconButton color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </MuiIconButton>
          </ThemeToggleContainer>
        </Header>

        <TaskListContainer>
          {tasks.map((task) => (
            <TaskItem key={task.id}>
              <div>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDescription>{task.description}</TaskDescription>
                <TaskDate>{task.date}</TaskDate>
              </div>
              <div>
                <IconButton title="Editar" onClick={() => openTaskModal(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton title="Excluir" onClick={() => openDeleteModal(task)}>
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
              <ModalTitle>{currentTask ? 'Editar Tarefa' : 'Nova Tarefa'}</ModalTitle>
              <ModalCloseButton onClick={closeTaskModal}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="title">Título</label>
                  <ModalInput
                    id="title"
                    type="text"
                    placeholder="Título"
                    value={modalTitle}
                    onChange={(e) => setModalTitle(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="description">Descrição</label>
                  <ModalTextarea
                    id="description"
                    placeholder="Descrição"
                    value={modalDesc}
                    onChange={(e) => setModalDesc(e.target.value)}
                    rows={4}
                  />
                </div>
                <SubmitButton type="submit">
                  {currentTask ? 'Salvar Alterações' : 'Adicionar Tarefa'}
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
};export default TasksListPage;