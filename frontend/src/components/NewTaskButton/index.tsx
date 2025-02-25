import React from 'react';
import { NewTaskButton as StyledNewTaskButton } from '../../pages/tasks-list/tasks-list.styles';
import AddIcon from '@mui/icons-material/Add';

interface NewTaskButtonProps {
  onClick: () => void;
}

const NewTaskButton: React.FC<NewTaskButtonProps> = ({ onClick }) => {
  return (
    <StyledNewTaskButton onClick={onClick} title="Criar nova tarefa" aria-label="Criar nova tarefa">
      <AddIcon aria-hidden="true" /> Criar Nova Tarefa
    </StyledNewTaskButton>
  );
};

export default NewTaskButton;
