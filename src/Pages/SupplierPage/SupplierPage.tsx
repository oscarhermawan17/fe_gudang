import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalForm from '@/Components/ModalForm.component';

// remove later
const formsInput = [
  {
    label: "Supplier name",
    type: "text",
    empty: false,
  },
  {
    label: "Supplier address",
    type: "text",
    empty: false,
  },
  {
    label: "Supplier email",
    type: "text",
    empty: true,
  },
  {
    label: "City",
    type: "text",
    empty: true,
  },
  {
    label: "Zipcode",
    type: "text",
    empty: true,
  },
  {
    label: "Phone",
    type: "text",
    empty: true,
  },
  {
    label: "PKP",
    type: "text",
    empty: true,
  },
  {
    label: "NPWP",
    type: "text",
    empty: true,
  },
]

export default function SupplierPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
      <Box sx={{ padding: '16px 0px', display: 'flex',  flexDirection: 'row-reverse' }}>
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<AddIcon />}
          color='success'
        >
          Supplier
        </Button>
        <ModalForm 
          open={open}
          onClose={handleClose}
          title="Create new Supplier"
          formsInput={formsInput}
        />
      </Box>
    </Box>
  );
}
