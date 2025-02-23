import React from 'react';
import ReactModal from 'react-modal';
import { customStyles } from '../../styles/theme';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  style?: ReactModal.Styles;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children, style }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style || customStyles}>
      {children}
    </ReactModal>
  );
};

export default Modal;
