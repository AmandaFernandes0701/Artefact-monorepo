import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Container,
  Header,
  ToggleButton,
  TaskListContainer,
  TaskItem,
  TaskTitle,
  TaskDescription,
  TaskDate,
  IconButton,
  NewTaskButton,
  ThemeToggleContainer,
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
  primary: '#4169E1', // Azul royal
  secondary: '#1e1e1e',
  border: '#333333',
};

// Dados de exemplo para as tarefas
const tasks: Task[] = [
  {
    id: 1,
    title: 'Comprar mantimentos',
    description: 'Leite, pão, ovos e frutas frescas.',
    date: '2025-03-15',
  },
  {
    id: 2,
    title: 'Reunião de Projeto',
    description: 'Discutir o design inovador do novo produto.',
    date: '2025-03-16',
  },
  {
    id: 3,
    title: 'Sessão de Exercícios',
    description: 'Treino na academia para manter a energia.',
    date: '2025-03-17',
  },
  {
    id: 1,
    title: 'Comprar mantimentos',
    description: 'Leite, pão, ovos e frutas frescas.',
    date: '2025-03-15',
  },
  {
    id: 2,
    title: 'Reunião de Projeto',
    description: 'Discutir o design inovador do novo produto.',
    date: '2025-03-16',
  },
  {
    id: 3,
    title: 'Sessão de Exercícios',
    description: 'Treino na academia para manter a energia.',
    date: '2025-03-17',
  },
  
];

const TasksListPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Alterna o tema
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Container>
        <Header>
          <h1>Lista de Tarefas</h1>

          <ThemeToggleContainer>
            <ToggleButton
              onClick={toggleTheme}
              title={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              <MuiIconButton color="inherit">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </MuiIconButton>
            </ToggleButton>
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
                <IconButton title="Editar">
                  <EditIcon />
                </IconButton>
                <IconButton title="Excluir">
                  <DeleteIcon />
                </IconButton>
              </div>
            </TaskItem>
          ))}
        </TaskListContainer>

        <NewTaskButton>
          <AddIcon /> Criar Nova Tarefa
        </NewTaskButton>
      </Container>
    </ThemeProvider>
  );
};
export default TasksListPage;
