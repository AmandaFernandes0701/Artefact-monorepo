import { DefaultTheme as Theme, styled } from 'styled-components';

type ThemeProps = { theme: Theme };

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: ${({ theme }: { theme: Theme }) => theme.background};
  color: ${({ theme }: { theme: Theme }) => theme.text};
  min-height: 100vh;
  width: 100vw;
  padding: 20px;
  transition: background 0.3s ease, color 0.3s ease;
`;

export const Header = styled.header`
  display: flex;
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
  transition: background 0.3s ease;
  
  &:hover {
    background: transparent;
  }
`;
export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }: { theme: Theme }) => theme.secondary};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.border};
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${({ theme }: { theme: Theme }) => theme.text};
    transform: scale(1.1);
  }
`;

export const ThemeToggleContainer = styled.button`
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }: ThemeProps) => theme.secondary};
    opacity: 0.8;
  }

  svg {
    font-size: 20px;
  }
`;