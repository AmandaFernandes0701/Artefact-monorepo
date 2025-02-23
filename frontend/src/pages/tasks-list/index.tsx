import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Modal from '../../components/Modal';
import Header from '../../components/Header';
import TaskItem from '../../components/TaskItem';
import NewTaskButton from '../../components/NewTaskButton';
import {
  FundoDiv,
  Container,
  TaskListContainer,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalInput,
  ModalTextarea,
  SubmitButton,
} from '../../pages/tasks-list/tasks-list.styles';
import { darkTheme, lightTheme } from '../../styles/theme';
import { useTarefas } from '../../hooks/useTarefas';
import { Tarefa } from '../../models/Tarefa';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

const TasksListPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState<Tarefa | null>(null);
  const [modalTitulo, setModalTitulo] = useState('');
  const [modalDescricao, setModalDescricao] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tarefaADeletar, setTarefaADeletar] = useState<Tarefa | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const { tarefas, loading, error, adicionarTarefa, editarTarefa, removerTarefa } = useTarefas();

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
    setFormErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
  
    try {
      if (tarefaAtual) {
        const updatedTarefa = {
          ...tarefaAtual,
          titulo: modalTitulo,
          descricao: modalDescricao,
        };
        await editarTarefa(tarefaAtual.id, updatedTarefa);
        toast.success("Tarefa atualizada com sucesso!", {
          style: { background: theme.background },
        });
      } else {
        await adicionarTarefa({ titulo: modalTitulo, descricao: modalDescricao });
        toast.success("Tarefa criada com sucesso!", {
          style: { background: theme.background },
        });
      }
      closeTaskModal();
    } catch (error: any) {
      const errorsArray = JSON.parse(error.message);
      const formattedErrors: { [key: string]: string } = {};
      errorsArray.forEach((err: any) => {
        if (err.path && err.path[0]) {
          formattedErrors[err.path[0]] = err.message;
        }
      });
      setFormErrors(formattedErrors);
    }
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
      toast.success("Tarefa deletada com sucesso!", {
        style: { background: theme.background },
      });
    }
    closeDeleteModal();
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <FundoDiv>
        <Container>
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          
          <TaskListContainer>
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", alignSelf: "center" }}>
                <ClipLoader color={theme.primary} size={15} cssOverride={{ borderWidth: '4px' }} />
                <p>Carregando tarefas...</p>
              </div>
            )}
            {Array.isArray(tarefas) && tarefas.length > 0 && !loading ? (
              tarefas.map(tarefa =>
                tarefa && tarefa.titulo ? (
                  <TaskItem 
                    key={tarefa.id} 
                    tarefa={tarefa} 
                    onEdit={openTaskModal} 
                    onDelete={openDeleteModal} 
                  />
                ) : null
              )
            ) : (
              !loading && (
                <p style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                  Nenhuma tarefa encontrada.
                </p>
              )
            )}
          </TaskListContainer>

          <NewTaskButton onClick={() => openTaskModal()} />

          <Modal isOpen={isTaskModalOpen} onRequestClose={closeTaskModal}>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>{tarefaAtual ? 'Editar Tarefa' : 'Nova Tarefa'}</ModalTitle>
                <ModalCloseButton onClick={closeTaskModal}>×</ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label>Título</label>
                  <ModalInput
                    value={modalTitulo}
                    onChange={e => setModalTitulo(e.target.value)}
                  />
                  {formErrors.titulo && (
                    <p style={{ color: 'red', fontSize: '14px' }}>{formErrors.titulo}</p>
                  )}
                  <label>Descrição</label>
                  <ModalTextarea 
                    style={{ maxHeight: '250px', minHeight: '25px' }}
                    value={modalDescricao}
                    onChange={e => setModalDescricao(e.target.value)}
                    rows={4}
                  />
                  {formErrors.descricao && (
                    <p style={{ color: 'red', fontSize: '14px' }}>{formErrors.descricao}</p>
                  )}
                  <SubmitButton type="submit">
                    {tarefaAtual ? 'Salvar' : 'Adicionar'}
                  </SubmitButton>
                </form>
              </ModalBody>
            </ModalContainer>
          </Modal>

          <Modal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal}>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>Confirmar Exclusão</ModalTitle>
                <ModalCloseButton onClick={closeDeleteModal}>×</ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <p style={{ textAlign: 'center' }}>
                  Tem certeza que deseja excluir esta tarefa?
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <SubmitButton onClick={confirmDelete}>Excluir</SubmitButton>
                </div>
              </ModalBody>
            </ModalContainer>
          </Modal>
        </Container>
      </FundoDiv>
    </ThemeProvider>
  );
};

export default TasksListPage;
