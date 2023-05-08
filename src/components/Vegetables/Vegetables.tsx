import { useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { ProductForm } from "components/ProductForm";
import {
	useGetVegetablesQuery,
	useGetVegetableTagsQuery,
} from 'app/api';

import { getColumns } from './utils';

export interface VegetablesProps {
	type: string;
  name: string;
  description: string;
  tags: string[];
}

export const Vegetables = (props:VegetablesProps)=>{

	const { tags, name, description } = props;

	const [ selectedVegetable, setSelectedVegetable ] = useState({
    id: '',
    name,
    description,
    tags
  });

  const { data: vegetables, isLoading } = useGetVegetablesQuery();
  const { data: vegetableTags } = useGetVegetableTagsQuery();

	const columns = useMemo(() => {
    return getColumns(vegetableTags || []);
  }, [ vegetableTags ]);

	const onRowClick = (params: GridRowParams) => {
    setSelectedVegetable(params.row)
  };

  return (
    <>
      <Box m={4} height={500} >
        <DataGrid
            sx={{
            '.MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold !important',
              overflow: 'visible !important'
            }
          }}
          rows={vegetables ?? []}
          loading={isLoading}
          columns={columns}
          onRowClick={onRowClick}
          paginationModel={{page: 0, pageSize: 25}}
        />
      </Box>
      {vegetableTags && <ProductForm {...props} selectedProduct={selectedVegetable} productTags={vegetableTags}/>}
    </>
  )
};