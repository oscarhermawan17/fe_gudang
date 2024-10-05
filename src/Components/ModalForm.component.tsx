import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalForm({ open, onClose, title, formsInput }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              {formsInput.map(formInput => {
                if(formInput.type === 'text') {
                  return (<TextField
                    error={false}
                    id="outlined-error"
                    label={formInput.label}
                    size="small"
                  />)
                } else if (formInput.type === 'dropdown') {
                  return (
                    <Box sx={{ margin: 1 }}>                     
                      <Select
                        value={""}
                        onChange={() => null}
                        size="small"
                        fullWidth
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="">
                          <em>Select {formInput.label}</em>
                        </MenuItem>
                        {formInput.items.map(item => (
                          <>
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          </>
                         ))}
                      </Select>
                    </Box>
                  )
                }
              })}
              <Box sx={{ margin: 1, display: 'flex', justifyContent: 'end'}}>
                <Button
                  onClick={() => null}
                  variant="contained"
                  color='success'
                >
                  Submit
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
