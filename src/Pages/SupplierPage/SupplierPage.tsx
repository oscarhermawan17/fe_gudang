import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import ModalForm from '@/Components/ModalForm.component';
import TablePagination from '@/Components/TablePagination.component';
import { useGetSuppliers, usePostSuppliers, useDeleteSuppliers } from '@/hooks/useSupplier';
import { usePaymentTypeSuppliers } from '@/hooks/usePaymentTypeSupplier'
import type { SupplierType, PaymentTypeSupplierType } from '@/utils/types';
import ModalConfirmation from '@/Components/ModalConfirmation.component';
import useToggle from '@/hooks/useToggle';

export default function SupplierPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataOnDelete, setDataOnDelete] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const { isOpen: isOpenModalConfirmation, closeToggle, openToggle } = useToggle(false);
  const { suppliers, count } = useGetSuppliers({ page, rowsPerPage })
  const { paymentTypeSuppliers, isLoading: isLoadingPaymentType } = usePaymentTypeSuppliers()

  const { mutate: addSuppliers } = usePostSuppliers();
  const { mutate: onDeleteSupplier } = useDeleteSuppliers();

  React.useEffect(() => {
    if(isOpenModalConfirmation) {
      closeToggle()
    }
  }, [suppliers])

  const formsInput = [
    { name: 'name', label: "Supplier name", type: "text", required: true,  },
    { name: 'contact', label: "Supplier contact", type: "text", required: true },
    { name: 'address', label: "Supplier address", type: "text", required: true },
    { name: 'email', label: "Supplier email", type: "text", required: false },
    { name: 'city', label: "City", type: "text", required: false },
    { name: 'zipcode', label: "Zipcode", type: "text", required: false },
    { name: 'phone',label: "Phone", type: "text", required: false },
    { name: 'pkp', label: "PKP", type: "text", required: false },
    { name: 'npwp', label: "NPWP", type: "text", required: true },
    { name: 'payment_type_suppliers', label: "Payment type", type: "dropdown", required: true, 
      options: isLoadingPaymentType ? [] : paymentTypeSuppliers.map((payment: PaymentTypeSupplierType) => ({
        id: payment.payment_type_supplier_id,
        value: payment.payment_type_supplier_name,
        description: payment.description
      }))
    },
  ];

  

  // Setting Urutan
  const settingData = suppliers.map((supplier: SupplierType) => ({
    id: supplier.supplier_id,
    name: supplier.name,
    address: supplier.address, 
    contact: supplier.contact,
    email: supplier.email,
    city: supplier.city,
    zipcode: supplier.zipcode,
    phone: supplier.phone,
    pkp: supplier.pkp,
    npwp: supplier.npwp,
    payment_type_suppliers: supplier.payment_type_suppliers[0].payment_type_supplier_name // GANTI
  }))

  console.log({ settingData })

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = async(data: any) => {
    const newData = {
      ...data,
      payment_type_suppliers: [data.payment_type_suppliers]
    }
    addSuppliers(newData)
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteClickHandle = (data) => {
    setDataOnDelete(data)
    openToggle()
  }

  const deleteSupplierHandler = () => {
    onDeleteSupplier(dataOnDelete.id)
  }

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
          onSubmit={handleSubmit}
        />
        <ModalConfirmation
          open={isOpenModalConfirmation}
          title={`You will delete Supplier ${dataOnDelete ? dataOnDelete.id : ''}`}
          body="Are you sure you want to proceed?"
          onClose={closeToggle}
          onConfirm={deleteSupplierHandler}
        />

      </Box>

      <TablePagination 
        tableHead={['ID', 'Name', 'Address', 'Contact', 'Email', 'City', 'Zip Code',
          'Phone', 'PKP', 'NPWP', 'Payment']}
        tableData={settingData}
        dataId={'id'}
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        onSetPage={handleChangePage}
        onRowsPerPage={handleChangeRowsPerPage}
        onDelete={(dataRow) => deleteClickHandle(dataRow)}
      />
    </Box>
  );
}
