import Button from '@mui/material/Button';
import TableMUI from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import type { Tags, TablePaginationProps } from './TablePagination.component.type';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const tagOfString = (tags: Tags) => tags.map(tag => <Chip color="primary" variant="outlined" label={tag} />)

// NEED UPDATE TYPE
const ActionButton = ({ dataRow, dataId, onDelete, onUpdate }: any) => {
  return (
    <TableCell sx={{ padding: '8px' }} style={{ width: 160 }} align="center">
      <Button sx={{ padding: 0, minWidth: 30 }} onClick={() => onUpdate(dataRow)} >
        <ModeEditIcon fontSize='medium'/>
      </Button>
      <Button sx={{ padding: 0, minWidth: 30 }} color='error' onClick={() => onDelete(dataRow)}>
        <DeleteForeverIcon fontSize='medium'/>
      </Button>
    </TableCell>
  )
}

const Table = ({ tableHead, tableData, dataId, page, count, rowsPerPage, onSetPage, onRowsPerPage,
  onDelete, onUpdate
}: TablePaginationProps) => {
  return (
    <TableContainer component={Paper}>
        <TableMUI sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {tableHead.map((title) => <StyledTableCell key={title} align="left">{title}</StyledTableCell>)}
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((dataRow: any) => (
              <TableRow key={dataRow[dataId]} hover>
                {Object.values(dataRow).map((dataColumn, index) => {
                  const column = dataColumn as string | string[];
                  return (
                    <TableCell key={index} sx={{ padding: '8px' }} component="th" scope="row">
                      {Array.isArray(column) ? tagOfString(column) : column}
                    </TableCell>
                  )
                })}
                <ActionButton dataRow={dataRow} dataId={dataId} onDelete={onDelete} onUpdate={onUpdate} />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                colSpan={tableData.length > 0 ? tableData[0].length : 1}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onSetPage}
                onRowsPerPageChange={onRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </TableMUI>
      </TableContainer>
  )
}

export default Table