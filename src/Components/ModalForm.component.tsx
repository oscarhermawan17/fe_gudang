import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  TextField, Button, Box, FormControl, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

type FormInputType = {
  name: string;
  label: string;
  type: 'text' | 'dropdown';
  required: boolean;
  options?: Array<{ id: number; value: string; description?: string }>;
};

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  title: string;
  formsInput: FormInputType[];
  onSubmit: (data: { [key: string]: string }) => void;
}

// Dynamic Zod Schema based on formsInput
const generateSchema = (formsInput: FormInputType[]) => {
  const schemaObj: any = {};
  
  formsInput.forEach((input) => {
    if (input.required) {
      schemaObj[input.name] = z.string().min(1, `${input.name} is required`);
    } else {
      schemaObj[input.name] = z.string().optional();
    }
  });
  
  return z.object(schemaObj);
};

const ModalForm: React.FC<ModalFormProps> = ({ open, onClose, title, formsInput, onSubmit }) => {
  const schema = generateSchema(formsInput);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formsInput.reduce((acc, curr) => {
      acc[curr.name] = '';
      return acc;
    }, {} as { [key: string]: string })
  });

  const onSubmitForm: SubmitHandler<{ [key: string]: string }> = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <FormControl fullWidth>
            {formsInput.map((input) => {
              if (input.type === 'text') {
                return (
                  <Box key={input.name} sx={{ marginBottom: 2 }}>
                    <TextField
                      size={'small'}
                      fullWidth
                      label={input.label}
                      {...register(input.name)}
                      error={!!errors[input.name]}
                      helperText={errors[input.name]?.message as string}
                    />
                  </Box>
                );
              } else if (input.type === 'dropdown' && input.options) {
                return (
                  <Box key={input.name} sx={{ marginBottom: 2 }}>
                    <Select
                      fullWidth
                      defaultValue=""
                      {...register(input.name)}
                      error={!!errors[input.name]}
                      displayEmpty
                      size={'small'}
                    >
                      <MenuItem value="" disabled>
                        Select {input.label}
                      </MenuItem>
                      {input.options?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors[input.name] && (
                      <Box color="error.main" mt={1}>
                        {errors[input.name]?.message as string}
                      </Box>
                    )}
                  </Box>
                );
              }
              return null;
            })}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmitForm)} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
