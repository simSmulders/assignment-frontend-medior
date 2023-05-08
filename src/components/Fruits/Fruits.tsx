import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { ProductForm } from "components/ProductForm";
import { useGetFruitsQuery, useGetFruitTagsQuery } from 'app/api';

import { getColumns } from './utils';

export interface FruitsProps {
  type: string;
  name: string;
  description: string;
  tags: string[];
};

export const Fruits = (props:FruitsProps)=>{

  const { tags, name, description } = props;

  const [ selectedFruit, setSelectedFruit ] = useState({
    id: '',
    name,
    description,
    tags
  })

  const { data: fruit, isLoading } = useGetFruitsQuery();
  const { data: fruitTags } = useGetFruitTagsQuery();

  const columns = useMemo(() => {
    return getColumns(fruitTags || []);
  }, [ fruitTags ]);

  const onRowClick = (params: GridRowParams) => {
    console.log(params);
    setSelectedFruit(params.row)
  }

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
          rows={fruit ?? []}
          loading={isLoading}
          columns={columns}
          onRowClick={onRowClick}
          paginationModel={{page: 0, pageSize: 25}}
        />
      </Box>

      {fruitTags && <ProductForm {...props} selectedProduct={selectedFruit} productTags={fruitTags} />}
    </>
  );
};