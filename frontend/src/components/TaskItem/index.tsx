import React from 'react';
import {
  TaskItem as StyledTaskItem,
  TaskTitle,
  TaskDescription,
  TaskDate,
  IconButton,
} from '../../pages/tasks-list/tasks-list.styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tarefa } from '../../models/Tarefa';

interface TaskItemProps {
  tarefa: Tarefa;
  onEdit: (tarefa: Tarefa) => void;
  onDelete: (tarefa: Tarefa) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ tarefa, onEdit, onDelete }) => {
  return (
    <StyledTaskItem role="article" aria-labelledby={`task-title-${tarefa.id}`}>
      <div>
        <TaskTitle id={`task-title-${tarefa.id}`}>{tarefa.titulo}</TaskTitle>
        <TaskDescription>{tarefa.descricao}</TaskDescription>
        <TaskDate>{new Date(tarefa.dataCriacao).toLocaleDateString('pt-BR')}</TaskDate>
      </div>
      <div>
        <IconButton
          title="Editar tarefa"
          aria-label="Editar tarefa"
          aria-describedby={`task-title-${tarefa.id}`}
          onClick={() => onEdit(tarefa)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          title="Deletar tarefa"
          aria-label="Deletar tarefa"
          aria-describedby={`task-title-${tarefa.id}`}
          onClick={() => onDelete(tarefa)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </StyledTaskItem>
  );
};

export default TaskItem;
