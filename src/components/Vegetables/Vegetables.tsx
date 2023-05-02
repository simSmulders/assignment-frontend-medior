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
  })

	const columns = useMemo(() => {
    return getColumns(tags);
  }, [ tags ]);

  const { data: vegetables, isLoading } = useGetVegetablesQuery();
  const { data: vegetableTags } = useGetVegetableTagsQuery();

	const onRowClick = (params: GridRowParams) => {
    console.log(params);
    setSelectedVegetable(params.row)
  };

  return (
    <>
      {vegetables && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={vegetables}
            loading={isLoading}
            columns={columns}
            onRowClick={onRowClick}
          />
        </Box>
      )}
      {vegetableTags && <ProductForm {...props} selectedProduct={selectedVegetable} productTags={vegetableTags}/>}
    </>
  )
};