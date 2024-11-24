import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ModalConfirmationProps {
  open: boolean;
  title: string;
  body: React.ReactNode | string;
  onClose: () => void;
  onConfirm: () => void;
  customButtons?: React.ReactNode;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  open,
  title = '',
  body,
  onClose,
  onConfirm,
  customButtons,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {typeof body === 'string' ? <p>{body}</p> : body}
      </DialogContent>
      <DialogActions>
        {customButtons ? (
          customButtons
        ) : (
          <>
            <Button onClick={onClose} color="primary">
              No
            </Button>
            <Button onClick={onConfirm} color="primary" autoFocus>
              Yes
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmation;
