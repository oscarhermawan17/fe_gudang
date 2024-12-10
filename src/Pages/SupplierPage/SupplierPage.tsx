import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import ModalForm from '@/Components/ModalForm.component';
import TablePagination from '@/Components/TablePagination.component';
import { useGetSuppliers, usePostSuppliers, useUpdateSupplier, useDeleteSuppliers } from '@/hooks/useSupplier';
import { usePaymentTypeSuppliers } from '@/hooks/usePaymentTypeSupplier'
import type { SupplierType, PaymentTypeSupplierType } from '@/utils/types';
import ModalConfirmation from '@/Components/ModalConfirmation.component';
import useToggle from '@/hooks/useToggle';

export default function SupplierPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataOnDelete, setDataOnDelete] = useState(undefined);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [idForUpdate, setIdForUpdate] = useState(undefined)

  const { isOpen: isOpenModalConfirmation, closeToggle, openToggle } = useToggle(false);
  const { suppliers, count } = useGetSuppliers({ page, rowsPerPage })
  const { paymentTypeSuppliers, isLoading: isLoadingPaymentType } = usePaymentTypeSuppliers()

  const { mutate: addSuppliers } = usePostSuppliers();
  const { mutate: onDeleteSupplier } = useDeleteSuppliers();
  const { mutate: onUpdateSupplier } = useUpdateSupplier();


  useEffect(() => {
    if(isOpenModalConfirmation) {
      closeToggle()
    }
  }, [suppliers])

  useEffect(() => {
    if (!isLoadingPaymentType && paymentTypeSuppliers.length > 0) {
      setFormsInput((prev) => ({
        ...prev,
        "payment_type_supplier": {
          ...prev["payment_type_supplier"],
          options: paymentTypeSuppliers.map((payment) => ({
            id: payment.payment_type_supplier_id,
            value: payment.payment_type_supplier_name,
            description: payment.description
          }))
        }
      }));
    }
  }, [paymentTypeSuppliers, isLoadingPaymentType]);

  const [formsInput, setFormsInput] = useState({
    "name" : { 
      name: 'name',
      label: "Supplier name",
      type: "text",
      required: true,
      value: ""
    },
    "contact": {
      name: "contact",
      label: "Supplier contact",
      type: "text",
      required: false,
      value: ""
    },
    "address" : {
      name: "address",
      label: "Supplier address",
      type: "text",
      required: false,
      value: "",
    },
    "email": {
      name: "email",
      label: "Supplier email",
      type: "text",
      required: false, 
      value: "",
    },
    "city": {
      name: "city",
      label: "City", 
      type: "text",
      required: false,
      value: "",
    },
    "zipcode": {
      name: "zipcode",
      label: "Zip Code",
      type: "text",
      required: false,
      value: "",
    },
    "phone": {
      name: "phone",
      label: "Phone",
      type: "text",
      required: false,
      value: ""
    },
    "pkp": {
      name: "pkp",
      label: "PKP",
      type: "text",
      required: false,
      value: ""
    },
    "npwp": {
      name: "npwp",
      label: "NPWP",
      type: "text",
      required: false,
      value: ""
    },
    "payment_type_supplier": {
      name: "payment_type_supplier",
      label: "Payment type",
      type: "dropdown",
      required: true,
      options: isLoadingPaymentType ? [] : paymentTypeSuppliers.map((payment: PaymentTypeSupplierType) => ({
        id: payment.payment_type_supplier_id,
        value: payment.payment_type_supplier_name,
        description: payment.description
      })),
      value: ""
    },
  })

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
    payment_type_supplier: supplier.payment_type_supplier.payment_type_supplier_name
  }))


  const handleOpen = () => setOpenModalForm(true);

  const handleClose = () => {
    setIsUpdate(false)
    setFormsInput((currentData) => {
      const updatedInput = {};
      for (const key in currentData) {
        updatedInput[key] = {
          ...currentData[key],
          value: ""
        };
      }
      return updatedInput;
    })
    setOpenModalForm(false);
  }

  const handleSubmit = (newData) => {
    const submitData = {
      ...newData,
      payment_type_supplier_id: newData.payment_type_supplier
    }
    addSuppliers(submitData)
  };

  const handleUpdate = (newData) => {
    const submitData = {
      ...newData,
      supplier_id: idForUpdate,
      payment_type_supplier_id: newData.payment_type_supplier
    }
    onUpdateSupplier(submitData)
  }

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

  const deleteSupplierHandler = (data) => {
    setDataOnDelete(data)
    openToggle()
  }

  const updateSupplierHandler = (data) => {
    setIsUpdate(true)
    setIdForUpdate(data.id)
    const findSupplier = paymentTypeSuppliers.find(payment => payment.payment_type_supplier_name === data.payment_type_supplier)
    const idSupplier = findSupplier.payment_type_supplier_id

    const newUpdateData = {
      ...data,
      payment_type_supplier: idSupplier
    }
    setFormsInput((currentData) => {
      const updatedInput = {};
      for (const key in currentData) {
        if (currentData.hasOwnProperty(key)) {
          updatedInput[key] = {
            ...currentData[key],
            value: newUpdateData[key]
          };
        }
      }
      return updatedInput;
    })
    setOpenModalForm(true)
  }

  const changeValueHandler = ({ value, entity }) => {
    setFormsInput((prev) => {
      return {
        ...prev,
        [entity]: {
          ...prev[entity],
          value
        },
      }
    })
  }

  const deleteSupplierConfirm = () => {
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
          open={openModalForm}
          onClose={handleClose}
          title={isUpdate ? "Update Supplier" : "Create new Supplier"}
          formsInput={Object.values(formsInput)}
          onChange={changeValueHandler}
          onSubmit={isUpdate ? handleUpdate : handleSubmit}
          isUpdate={isUpdate}
        />
        <ModalConfirmation
          open={isOpenModalConfirmation}
          title={`You will delete Supplier ${dataOnDelete ? dataOnDelete.name : ''}`}
          body="Are you sure you want to proceed?"
          onClose={closeToggle}
          onConfirm={deleteSupplierConfirm}
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
        onDelete={(dataRow) => deleteSupplierHandler(dataRow)}
        onUpdate={(dataRow) => updateSupplierHandler(dataRow)}
      />
    </Box>
  );
}
