import React, { useEffect, useState, } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import ModalForm from '@/Components/ModalForm.component';
import ModalConfirmation from '@/Components/ModalConfirmation.component';

import { useGetProducts, useCreateProduct, useDeleteProduct } from '@/hooks/useProduct/useProduct';
import { useGetAllCategory } from '@/hooks/useCategory';
import { useGetAllSizeType } from '@/hooks/useSizeType';
import Table from '@/Components/TablePagination.component';
import { useGetAllSuppliers } from '@/hooks/useSupplier';
import { useGetAllColors  } from '@/hooks/useColor';

import type { ProductType, SupplierType, CategoryType, SizeTypeType } from '@/utils/types';
import useToggle from '@/hooks/useToggle';

export default function ProductPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [dataOnDelete, setDataOnDelete] = useState(undefined);
  const [isUpdate, setIsUpdate] = useState(false)

  const { isOpen: isOpenModalConfirmation, closeToggle, openToggle } = useToggle(false);
  const { products, count } = useGetProducts({ page, rowsPerPage })
  const { mutate: onCreateProduct } = useCreateProduct();
  const { mutate: onDeleteProduct} = useDeleteProduct()
  
  const { categories, isLoading: isLoadingCategories } = useGetAllCategory()
  const { allSuppliers, isLoading: isLoadingAllSuppliers } = useGetAllSuppliers()
  const { sizeTypes, isLoading: isLoadingSizeTypes } = useGetAllSizeType()
  const { allColors, isLoading: isLoadingAllColors } = useGetAllColors()

  const [formsInput, setFormsInput] = useState({
    "product_name" : { 
      name: 'product_name',
      label: "Product Name",
      type: "text",
      required: true,
      value: ''
    },
    "color_id": {
      name: "color_id",
      label: "Color",
      type: "dropdown",
      required: true,
      value: "",
      options: []
    },
    "category_id" : {
      name: "category_id",
      label: "Category",
      type: "dropdown",
      required: true,
      value: "",
      options: []
    },
    "supplier_id": {
      name: "supplier_id",
      label: "Supplier",
      type: "dropdown",
      required: true, 
      value: "",
      options: []
    },
    "sizetype_id": {
      name: "sizetype_id",
      label: "Size type", 
      type:"dropdown",
      required: true,
      value: "",
      options: []
    },
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

  useEffect(() => {
    if(isOpenModalConfirmation) {
      closeToggle()
    }
  }, [products])

  useEffect(() => {
    if (!isLoadingAllColors && allColors.length > 0) {
      setFormsInput((prev) => ({
        ...prev,
        "color_id": {
          ...prev["color_id"],
          options: allColors.map((color) => ({
            id: color.color_id,
            value: color.name,
          }))
        }
      }));
    }
  }, [allColors, isLoadingAllColors]);

  useEffect(() => {
    if (!isLoadingCategories && categories.length > 0) {
      setFormsInput((prev) => ({
        ...prev,
        "category_id": {
          ...prev["category_id"],
          options: categories.map((category: CategoryType) => ({
              id: category.category_id,
              value: category.name,
              description: ''
          }))
        }
      }));
    }
  }, [categories, isLoadingCategories]);

  useEffect(() => {
    if (!isLoadingAllSuppliers && allSuppliers.length > 0) {
      setFormsInput((prev) => ({
        ...prev,
        "supplier_id": {
          ...prev["supplier_id"],
          options: allSuppliers.map((supplier: SupplierType) => {
            return {
              id: supplier.supplier_id,
              value: supplier.name,
              description: ''
            }
          })
        }
      }));
    }
  }, [allSuppliers, isLoadingAllSuppliers]);

  useEffect(() => {
    if (!isLoadingSizeTypes && sizeTypes.length > 0) {
      setFormsInput((prev) => ({
        ...prev,
        "sizetype_id": {
          ...prev["sizetype_id"],
          options: sizeTypes.map((sizeType: SizeTypeType) => ({
            id: sizeType.size_type_id,
            value: sizeType.size_type_id,
            description: ''
          }))
        }
      }));
    }
  }, [sizeTypes, isLoadingSizeTypes]);
  
  const settingData = products.map((product: ProductType ) => ({
    product_name: product.product_name,
    color: 'red',
    category: product.category?.name,
    supplier: product.supplier?.name,
    sizetype: product.sizetype?.size_type_id,
    purchasePrice: product.purchase_price,
    sellingPrice: product.selling_price,
    consignment: product.consignment,
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
  
  const handleSubmit = async(addProduct: any) => {
    const createNewProduct = {
      barcode: addProduct.barcode,
      category: addProduct.category_id,
      sizetype: addProduct.sizetype_id,
      supplier: addProduct.supplier_id
    }
    onCreateProduct(createNewProduct)
  };

  const handleUpdate = (newData) => {
    // const submitData = {
    //   ...newData,
    //   supplier_id: idForUpdate,
    //   payment_type_supplier_id: newData.payment_type_supplier
    // }
    // onUpdateSupplier(submitData)
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

  const deleteProductHandler = (data) => {
    const dataWithId = products.find(product => product.product_name === data.product_name)
    setDataOnDelete(dataWithId)
    openToggle()
  }

  const deleteProductConfirm = () => {
    onDeleteProduct(dataOnDelete.product_id)
  }

  const changeValueHandler = ({ value, entity }) => {
    const supplierFind = allSuppliers.find((supplier) => supplier.supplier_id === formsInput.supplier_id.value)
    const supplierType = supplierFind && supplierFind.payment_type_supplier.payment_type_supplier_name

    if(entity === "supplier_id") {
      const findSupplier = allSuppliers.find((supplier) => supplier.supplier_id === value)
      const typeSupplier = findSupplier.payment_type_supplier.payment_type_supplier_name

      if(typeSupplier === "Wholeshale") {
        setFormsInput((prev) => {
          return {
            ...prev,
            [entity]: {
              ...prev[entity],
              value
            },
            selling_price: {
              ...prev.selling_price,
              disabled: false,
            },
            consignment: {
              ...prev.consignment,
              disabled: true,
              value: 0
            }
          }
        })
      } else if(typeSupplier === "Consignment Payment"){
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
    // untuk isi otomatis ke selling price, type supplier harus consignment
    else if((entity === "purchase_price" || entity === "consignment") && supplierType === "Consignment Payment") {
      const purchaseToNumber = entity === "purchase_price" ? Number(value) : Number(formsInput.purchase_price.value)
      const consigmentToNumber = entity === "purchase_price" ? Number(formsInput.consignment.value) : Number(value)
      const sellingPrice = purchaseToNumber + purchaseToNumber * consigmentToNumber / 100

      setFormsInput((prev) => {
        return {
          ...prev,
          [entity]: {
            ...prev[entity],
            value
          },
          selling_price: {
            ...prev.selling_price,
            value: String(sellingPrice)
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

  const updateProductHandler = (dataRow) => {
    setIsUpdate(true)
    const findCategory = categories.find(category => category.name === dataRow.category)
    const category_id = findCategory.category_id

    const findSupplier = allSuppliers.find(supplier => supplier.name === dataRow.supplier)
    const supplier_id = findSupplier.supplier_id

    const newUpdateData = {
      ...dataRow,
      category_id,
      supplier_id, 
      sizetype_id: dataRow.sizetype
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
          open={openModalForm}
          onClose={handleClose}
          title={isUpdate ? "Update Product" : "Create new Product"}
          formsInput={Object.values(formsInput)}
          onChange={changeValueHandler}
          onSubmit={handleSubmit}
          onSubmit={isUpdate ? handleUpdate : handleSubmit}
          isUpdate={isUpdate}
        />
        <ModalConfirmation
          open={isOpenModalConfirmation}
          title={`You will delete Product ${dataOnDelete ? dataOnDelete.product_name : ''}`}
          body="Are you sure you want to proceed?"
          onClose={closeToggle}
          onConfirm={deleteProductConfirm}
        />
      </Box>
      
      <Table 
        tableHead={['Product Name', 'Color', 'Category', 'Supplier', 'Size Type', 'Purchase', 'Selling', 'Consignment']}
        tableData={settingData}
        dataId={'product_name'}
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        onSetPage={handleChangePage}
        onRowsPerPage={handleChangeRowsPerPage}
        onDelete={(dataRow) => deleteProductHandler(dataRow)}
        onUpdate={(dataRow) => updateProductHandler(dataRow)}
      />
    </Box>
  );
}
