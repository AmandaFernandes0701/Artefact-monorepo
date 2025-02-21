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
import AddIcon from '@mui/icons-material/Add';
import { IconButton as MuiIconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Define a interface para uma tarefa
interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
}

// Temas: claro e escuro
const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#00BFFF', // Azul piscina
  secondary: '#f7f7f7',
  border: '#e0e0e0',
};

const darkTheme = {
  background: '#121212',
  text: '#f5f5f5',
  primary: '#4169E1',
  secondary: '#1e1e1e',
  border: '#333333',
};

const tasks: Task[] = Array.from({ length: 2 }, (_, index) => ({
  id: index + 1,
  title: 'Comprar mantimentos',
  description: 'Leite, pão, ovos e frutas frescas.',
  date: '2025-03-15',
}));

// Estilização customizada para o react-modal: Centraliza o modal e define minWidth de 600px
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  useEffect(() => {
    // Define o appElement para acessibilidade, utiliza document.body se o seletor #root não existir
    ReactModal.setAppElement(document.body);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const openModal = (task?: Task) => {
    if (task) {
      setCurrentTask(task);
      setModalTitle(task.title);
      setModalDesc(task.description);
    } else {
      setCurrentTask(null);
      setModalTitle('');
      setModalDesc('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode tratar os dados do formulário e atualizar a lista de tarefas
    console.log('Título:', modalTitle);
    console.log('Descrição:', modalDesc);
    closeModal();
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Container>
        <Header>
          <h1>Lista de Tarefas</h1>
          <ThemeToggleContainer onClick={toggleTheme} title={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}>
            <MuiIconButton color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </MuiIconButton>
          </ThemeToggleContainer>
        </Header>

        <TaskListContainer>
          {tasks.map(task => (
            <TaskItem key={task.id}>
              <div>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDescription>{task.description}</TaskDescription>
                <TaskDate>{task.date}</TaskDate>
              </div>
              <div>
                <IconButton title="Editar" onClick={() => openModal(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton title="Excluir">
                  <DeleteIcon />
                </IconButton>
              </div>
            </TaskItem>
          ))}
        </TaskListContainer>

        <NewTaskButton onClick={() => openModal()}>
          <AddIcon /> Criar Nova Tarefa
        </NewTaskButton>

        <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{currentTask ? 'Editar Tarefa' : 'Nova Tarefa'}</ModalTitle>
              <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
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
                    onChange={e => setModalTitle(e.target.value)}
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
      </Container>
    </ThemeProvider>
  );
};

export default TasksListPage;