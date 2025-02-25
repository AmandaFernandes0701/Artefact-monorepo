import React, { useState, useCallback, useMemo } from 'react';
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

  const { tarefas, loading, adicionarTarefa, editarTarefa, removerTarefa } = useTarefas();

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);
  const toastStyle = useMemo(() => ({ background: theme.background }), [theme.background]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const openTaskModal = useCallback((tarefa?: Tarefa) => {
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
  }, []);

  const closeTaskModal = useCallback(() => {
    setIsTaskModalOpen(false);
    setTarefaAtual(null);
    setFormErrors({});
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
        toast.success("Tarefa atualizada com sucesso!", { style: toastStyle });
      } else {
        await adicionarTarefa({ titulo: modalTitulo, descricao: modalDescricao });
        toast.success("Tarefa criada com sucesso!", { style: toastStyle });
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
  }, [tarefaAtual, modalTitulo, modalDescricao, editarTarefa, adicionarTarefa, toastStyle, closeTaskModal]);

  const openDeleteModal = useCallback((tarefa: Tarefa) => {
    setTarefaADeletar(tarefa);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setTarefaADeletar(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (tarefaADeletar) {
      await removerTarefa(tarefaADeletar.id);
      toast.success("Tarefa deletada com sucesso!", { style: toastStyle });
    }
    closeDeleteModal();
  }, [tarefaADeletar, removerTarefa, toastStyle, closeDeleteModal]);

  return (
    <ThemeProvider theme={theme}>
      <FundoDiv>
        <Container>
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          
          <TaskListContainer role="list">
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", alignSelf: "center" }} role="status">
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

          <NewTaskButton onClick={() => openTaskModal()} aria-label="Adicionar nova tarefa" />

          <Modal isOpen={isTaskModalOpen} onRequestClose={closeTaskModal}>
            <ModalContainer role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <ModalHeader>
                <ModalTitle id="modal-title">{tarefaAtual ? 'Editar Tarefa' : 'Nova Tarefa'}</ModalTitle>
                <ModalCloseButton onClick={closeTaskModal} aria-label="Fechar Modal">×</ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label htmlFor="modal-titulo">Título</label>
                  <ModalInput
                    id="modal-titulo"
                    value={modalTitulo}
                    onChange={e => setModalTitulo(e.target.value)}
                  />
                  {formErrors.titulo && (
                    <p style={{ color: 'red', fontSize: '14px' }}>{formErrors.titulo}</p>
                  )}
                  <label htmlFor="modal-descricao">Descrição</label>
                  <ModalTextarea 
                    id="modal-descricao"
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
            <ModalContainer role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
              <ModalHeader>
                <ModalTitle id="delete-modal-title">Confirmar Exclusão</ModalTitle>
                <ModalCloseButton onClick={closeDeleteModal} aria-label="Fechar Modal">×</ModalCloseButton>
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
