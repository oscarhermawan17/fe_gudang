
export type Tags = Array<string>

export type TablePaginationProps = {
  tableHead: Array<string>;
  tableData: any;
  dataId: string;
  page: number;
  count: number;
  rowsPerPage: number;
  onSetPage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDelete: (id: string) => void;
}