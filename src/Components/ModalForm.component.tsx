import React from 'react';
import {
  TextField, Button, Box, FormControl, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

type FormInputType = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: any[];
  disabled?: boolean;
};

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  title: string;
  formsInput: FormInputType[];
  onSubmit: (data: { [key: string]: string }) => void;
  onChange: (args: { value: string; entity: string }) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, onClose, title, isUpdate, formsInput, onSubmit, onChange }) => {
  const handleSubmit = () => {
    const submitData = formsInput.reduce((acc, currentValue) => {
      acc[currentValue.name] = currentValue.value
      return acc
    }, {})
    onSubmit(submitData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          {formsInput.map((input) => (
            <Box key={input.name} sx={{ marginBottom: 2 }}>
              {input.type === 'text' || input.type === 'number' || input.type === 'percentage' ? (
                <TextField
                  type={input.type === 'percentage' ? 'number' : input.type}
                  size="small"
                  fullWidth
                  label={input.label}
                  disabled={input.disabled}
                  inputProps={input.type === 'percentage' ? { min: 0, max: 100 } : undefined}
                  value={input.value}
                  onChange={(e) => onChange({ value: e.target.value, entity: input.name })}
                />
              ) : input.type === 'dropdown' && input.options ? (
                <Select
                  fullWidth
                  displayEmpty
                  size="small"
                  value={input.value}
                  onChange={(e) => onChange({ value: e.target.value, entity: input.name })}
                >
                  <MenuItem disabled value="">
                    Select {input.label}
                  </MenuItem>
                  {input.options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              ) : null}
            </Box>
          ))}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color={isUpdate ? 'primary' : 'inherit'}>
          {isUpdate ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
