import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalForm from '@/Components/ModalForm.component';
import { useGetProducts } from '@/hooks/useProduct/useProduct';
import { useGetAllCategory } from '@/hooks/useCategory';
import { useGetAllSizeType } from '@/hooks/useSizeType';
import Table from '@/Components/Table.component';
import { useGetAllSuppliers } from '@/hooks/useSupplier';

export default function ProductPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const { categories, isLoading: isLoadingCategories } = useGetAllCategory()
  const { allSuppliers, isLoading: isLoadingAllSuppliers } = useGetAllSuppliers()
  const { sizeTypes, isLoading: isLoadingSizeTypes } = useGetAllSizeType()
  const { products, count, error, isLoading } = useGetProducts({ page, rowsPerPage })

  const formsInput = [
    { name: 'barcode', label: "Barcode", type: "text", required: true,  },
    { name: 'category_id', label: "Category", type: "dropdown", required: true, options: isLoadingCategories ? [] : categories.map(category => ({
      id: category.category_id,
      value: category.name,
      description: ''
    }))},
    { name: 'supplier_id', label: "Supplier", type: "dropdown", required: true, options: isLoadingAllSuppliers ? [] : allSuppliers.map(supplier => ({
      id: supplier.supplier_id,
      value: supplier.name,
      description: ''
    }))},
    { name: 'sizetype_id', label: "Size type", type: "dropdown", required: true, options: isLoadingSizeTypes ? [] : sizeTypes.map(sizeType => ({
      id: sizeType.size_type_id,
      value: sizeType.size_type_id,
      description: ''
    }))},
  ]
  
  const settingData = products.map((product) => ({
    id: product.product_id,
    barcode: product.barcode,
    category: product.category?.category_id,
    supplier: product.supplier?.name,
    sizetype: product.sizetype?.size_type_id
  }))

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  
  const handleSubmit = async() => {};

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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

  const handleDelete = (id) => {

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
          formsInput={formsInput}
          onSubmit={handleSubmit}
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
        onDelete={(id) => handleDelete(id)}
      />
    </Box>
  );
}
