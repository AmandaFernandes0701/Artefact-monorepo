import { DefaultTheme as Theme, css, styled } from 'styled-components';

type ThemeProps = { theme: Theme };

export const FundoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  height: 100%;
  background: ${({ theme }: { theme: Theme }) => theme.background};
  color: ${({ theme }: { theme: Theme }) => theme.text};
  transition:
    background 0.5s ease,
    color 0.5s ease;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px 50px 0px;
  margin: 0;
  height: fit-content;
  background: ${({ theme }: { theme: Theme }) => theme.background};
  color: ${({ theme }: { theme: Theme }) => theme.text};
  transition:
    background 0.5s ease,
    color 0.5s ease;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 500;
  }
`;

export const ToggleButton = styled.button`
  background: transparent;
  color: ${({ theme }: { theme: Theme }) => theme.primary};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.5s ease;

  &:hover {
    background: transparent;
  }
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 650px;
  padding-top: 5px;
  overflow-y: auto;
  min-width: 30%;

  @media (max-width: 700px) {
    width: 100%;
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.scrollThumbColor}${({ theme }) =>
      theme.scrollTrackBackground};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollTrackBackground};
    margin-right: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollThumbColor};
    border-radius: 2px;
  }
`;

export const TaskItem = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }: { theme: Theme }) => theme.secondary};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.border};
  border-radius: 8px;
  padding: 15px;
  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease;

  @media (max-width: 500px) {
    width: auto;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const TaskTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const TaskDescription = styled.p`
  margin: 5px 0;
  font-size: 0.95rem;
  line-height: 1.4;
`;

export const TaskDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }: { theme: Theme }) => theme.primary};
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }: { theme: Theme }) => theme.primary};
  cursor: pointer;
  margin-left: 10px;
  transition:
    color 0.5s ease,
    transform 0.5s ease;

  &:hover {
    color: ${({ theme }: { theme: Theme }) => theme.text};
    transform: scale(1.1);
  }
`;

export const ThemeToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.5rem;
    color: ${({ theme }: ThemeProps) => theme.primary};
  }
`;

export const NewTaskButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }

  svg {
    font-size: 20px;
  }
`;

export const ModalOverlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.background};
  color: ${({ theme }: { theme: Theme }) => theme.text};
  padding: 20px;
  border-radius: 8px;
  width: 50vw;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const ModalCloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }: { theme: Theme }) => theme.primary};
  position: absolute;
  top: 0;
  right: 0;
`;

export const ModalBody = styled.div`
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const ModalInput = styled.input`
  padding: 10px;
  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background === '#121212' ? '#333' : '#fff'};
  color: ${({ theme }: { theme: Theme }) => theme.text};
  border: 1px solid
    ${({ theme }: { theme: Theme }) => (theme.background === '#121212' ? '#444' : theme.border)};
  border-radius: 4px;
  font-size: 1rem;
`;

export const ModalTextarea = styled.textarea`
  padding: 10px;
  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background === '#121212' ? '#333' : '#fff'};
  color: ${({ theme }: { theme: Theme }) => theme.text};
  border: 1px solid
    ${({ theme }: { theme: Theme }) => (theme.background === '#121212' ? '#444' : theme.border)};
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
`;
export const SubmitButton = styled.button`
  background-color: ${({ theme }: { theme: Theme }) => theme.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 500ms ease;

  &:hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.primaryHover};
  }
`;
