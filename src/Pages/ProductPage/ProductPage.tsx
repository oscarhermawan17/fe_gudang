import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import ModalForm from '@/Components/ModalForm.component';
import ModalConfirmation from '@/Components/ModalConfirmation.component';
import { SelectChangeEvent } from '@mui/material/Select';

import { useGetProducts, useCreateProduct, useDeleteProduct } from '@/hooks/useProduct/useProduct';
import { useGetAllCategory } from '@/hooks/useCategory';
import { useGetAllSizeType } from '@/hooks/useSizeType';
import Table from '@/Components/TablePagination.component';
import { useGetAllSuppliers } from '@/hooks/useSupplier';
import type { ProductType, SupplierType, CategoryType, SizeTypeType } from '@/utils/types';
import useToggle from '@/hooks/useToggle';

export default function ProductPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [dataOnDelete, setDataOnDelete] = React.useState(undefined);
  
  const { categories, isLoading: isLoadingCategories } = useGetAllCategory()
  const { allSuppliers, isLoading: isLoadingAllSuppliers } = useGetAllSuppliers()
  const { sizeTypes, isLoading: isLoadingSizeTypes } = useGetAllSizeType()

  const [formsInput, setFormsInput] = React.useState({
    "product_name" : { 
      name: 'product_name',
      label: "Product Name",
      type: "text",
      required: true,
      value: ''
    },
    "color": {
      name: "color",
      label: "Color",
      type: "text",
      required: true,
      value: ''
    },
    "category_id" : {
      name: "category_id",
      label: "Category",
      type: "dropdown",
      required: true,
      options: isLoadingCategories ? [] : categories.map((category: CategoryType) => ({
        id: category.category_id,
        value: category.name,
        description: ''
    }))},
    "supplier_id": {
      name: "supplier_id",
      label: "Supplier",
      type: "dropdown",
      required: true, 
      options: isLoadingAllSuppliers ? [] : allSuppliers.map((supplier: SupplierType) => {
        return {
          id: supplier.supplier_id,
          value: supplier.name,
          description: ''
        }
      })},
    "sizetype_id": {
      name: "sizetype_id",
      label: "Size type", 
      type:"dropdown",
      required: true,
      options: isLoadingSizeTypes ? [] : sizeTypes.map((sizeType: SizeTypeType) => ({
        id: sizeType.size_type_id,
        value: sizeType.size_type_id,
        description: ''
      }))},
    "purchase_price": {
      name: "purchase_price",
      label: "Purchase Price",
      value: 0,
      type: "number",
      required: true
    },
    "selling_price": {
      name: "selling_price",
      label: "Selling Price",
      value: 0,
      type: "number",
      disabled: true,
      required: true 
    },
    "consignment": {
      name: "consignment",
      label: "Consigment",
      value: 0,
      type: "percentage",
      required: false,
      disabled: true
    },
  })

  const { isOpen: isOpenModalConfirmation, closeToggle, openToggle } = useToggle(false);
  const { products, count } = useGetProducts({ page, rowsPerPage })
  const { mutate: onCreateProduct } = useCreateProduct();
  const { mutate: onDeleteProduct} = useDeleteProduct()

  React.useEffect(() => {
    if(isOpenModalConfirmation) {
      closeToggle()
    }
  }, [products])
  
  const settingData = products.map((product: ProductType ) => ({
    id: product.product_id,
    barcode: product.barcode,
    category: product.category?.name,
    supplier: product.supplier?.name,
    sizetype: product.sizetype?.size_type_id
  }))

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  
  const handleSubmit = async(addProduct: any) => {
    const createNewProduct = {
      barcode: addProduct.barcode,
      category: addProduct.category_id,
      sizetype: addProduct.sizetype_id,
      supplier: addProduct.supplier_id
    }
    onCreateProduct(createNewProduct)
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

  const deleteProductHandle = () => {
    onDeleteProduct(dataOnDelete.id)
  }

  const changeValueHandler = ({ value, entity }) => {
    const randomNum = Math.floor((Math.random() * 100) + 1);

    if(entity === "supplier_id") {
      const findSupplierType = allSuppliers.find((supplier) => supplier.supplier_id === value)
      if(randomNum % 2 === 0) { // whole sale
        setFormsInput((prev) => {
          return {
            ...prev,
            [entity]: {
              ...prev[entity],
              value
            },
            purchase_price: {
              ...prev.purchase_price,
              disabled: false,
            },
            consignment: {
              ...prev.consignment,
              disabled: true,
              value: 0
            }
          }
        })
      } else {
        setFormsInput((prev) => {
          return {
            ...prev,
            [entity]: {
              ...prev[entity],
              value
            },
            selling_price: {
              ...prev.selling_price,
              disabled: true,
              value: 0
            },
            consignment: {
              ...prev.consignment,
              disabled: false,
            }
          }
        })
      }
    }

    else if(entity === "purchase_price" && true) {
      setFormsInput((prev) => {
        return {
          ...prev,
          [entity]: {
            ...prev[entity],
            value
          },
          selling_price: {
            ...prev.selling_price,
            value: 100/formsInput.consignment.value * value
          }
        }
      })
    } else if(entity === "consignment" && true) {
      setFormsInput((prev) => {
        return {
          ...prev,
          [entity]: {
            ...prev[entity],
            value
          },
          selling_price: {
            ...prev.selling_price,
            value: 100/value * formsInput.purchase_price.value
          }
        }
      })
    } else {
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
          Product
        </Button>
        <ModalForm
          open={open}
          onClose={handleClose}
          title="Create new Product"
          formsInput={Object.values(formsInput)}
          onChange={changeValueHandler}
          onSubmit={handleSubmit}
        />
        <ModalConfirmation
          open={isOpenModalConfirmation}
          title={`You will delete Product ${dataOnDelete ? dataOnDelete.id : ''}`}
          body="Are you sure you want to proceed?"
          onClose={closeToggle}
          onConfirm={deleteProductHandle}
        />
      </Box>
      
      <Table 
        tableHead={['Product ID', 'Barcode', 'Category', 'Supplier', 'Size Type']}
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
