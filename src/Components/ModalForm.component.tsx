import React, { useState } from 'react';
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

const ModalForm: React.FC<ModalFormProps> = ({ open, onClose, title, formsInput, onSubmit, onChange }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>(
    formsInput.reduce((acc, curr) => {
      acc[curr.name] = '';
      return acc;
    }, {} as { [key: string]: string })
  );

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>, name: string) => {
    const value = e.target.value as string;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    onChange({ value, entity: name });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    formsInput.forEach((input) => {
      if (input.required && !formValues[input.name]) {
        errors[input.name] = `${input.label} is required`;
      }
    });
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    onSubmit(formValues);
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
                  value={formValues[input.name]}
                  onChange={(e) => handleChange(e, input.name)}
                  error={!!formErrors[input.name]}
                  helperText={formErrors[input.name]}
                />
              ) : input.type === 'dropdown' && input.options ? (
                <Select
                  fullWidth
                  displayEmpty
                  size="small"
                  value={formValues[input.name]}
                  onChange={(e) => handleChange(e, input.name)}
                  error={!!formErrors[input.name]}
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
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
