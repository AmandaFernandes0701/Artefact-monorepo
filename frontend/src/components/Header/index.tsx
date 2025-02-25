import React from 'react';
import { Header as StyledHeader, ThemeToggleContainer } from '../../pages/tasks-list/tasks-list.styles';
import { IconButton as MuiIconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, title = 'Lista de Tarefas' }) => {
  return (
    <StyledHeader>
      <ThemeToggleContainer>
        <MuiIconButton
          onClick={toggleTheme}
          title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          {isDarkMode ? <LightModeIcon aria-hidden="true" /> : <DarkModeIcon aria-hidden="true" />}
        </MuiIconButton>
      </ThemeToggleContainer>
      <h1 style={{ fontWeight: 'bold' }} aria-live="polite">{title}</h1>
    </StyledHeader>
  );
};

export default Header;
