import { useEffect, useMemo, useState } from 'react';
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

  const columns = useMemo(() => {
    return getColumns(tags);
  }, [ tags ]);
  
  const { data: fruit, isLoading } = useGetFruitsQuery();
  const { data: fruitTags } = useGetFruitTagsQuery();

  const onRowClick = (params: GridRowParams) => {
    console.log(params);
    setSelectedFruit(params.row)
  }
  
  return (
    <>
      {fruit && fruitTags && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={fruit}
            loading={isLoading}
            columns={columns}
            onRowClick={onRowClick} />
        </Box>
      )}

      {fruitTags && <ProductForm {...props} selectedProduct={selectedFruit} productTags={fruitTags} />}
    </>
  );
};