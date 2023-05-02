import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export const getColumns = (tags:string[]) => {
  console.log(tags);
  return [
  {
    field: 'name',
    headerName: 'Title',
    width: 150
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      
    }
  }
]};
