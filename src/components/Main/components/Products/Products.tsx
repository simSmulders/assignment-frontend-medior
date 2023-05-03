import { Box, Chip } from '@mui/material';
import { DataGrid, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import {
  useGetFruitsQuery,
  useGetVegetableTagsQuery,
  useGetVegetablesQuery,
  useGetFruitTagsQuery
} from "app/api";
import { useMemo } from "react";

export interface ProductsProps {};

export const Products = (props:ProductsProps) => {

  const { data: fruits, isLoading: isLoadingFruits } = useGetFruitsQuery();
  const { data: vegetables, isLoading: isLoadingVegetables } = useGetVegetablesQuery();
  const { data: fruitTags } = useGetFruitTagsQuery();
  const { data: vegetableTags } = useGetVegetableTagsQuery();

  const rows = useMemo(() => {
    if (!fruits || !vegetables) {
      return;
    }
    return fruits.concat(vegetables).filter(product => !product.isArchived)
  }, [ fruits, vegetables ])

  const getTags = (params: GridValueGetterParams) => {

    if (!fruitTags && !vegetableTags) {
      return;
    }

    const productTags = fruitTags?.concat(vegetableTags || []);

    if (!params.value) {
      return;
    }
    return params.value.map((val:string) => productTags?.find(tag => tag.id === val)?.name)
  }

  type ChipColor = "default" | "primary" | "secondary" | "error";

  const getColor = (val: string): ChipColor => {
    let color: ChipColor = "default";
    if (val === "Organic") {
      color = "primary";
    }
    if (val === "Fresh") {
      color = "secondary";
    }
    if (val === "Out of Season") {
      color = "error";
    }
    return color;
  };


  const columns = [
    {
      field: 'name',
      headerName: 'Title',
      width: 100
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 300,
      valueGetter: getTags,
      renderCell: (params: GridRenderCellParams) => (
        params.value ? params.value.map((val: string) => {
          return (
            <Chip
              key={val}
              label={val}
              color={getColor(val)}
            />)
        }) : null
      )
    }
  ]

  const isLoadingProducts = isLoadingFruits && isLoadingVegetables;

  return (
    <>
      {rows && (<Box sx={{ height: 900, width: '100%' }}>
        <DataGrid
          rows={rows}
          loading={isLoadingProducts}
          columns={columns}
          hideFooterPagination
        />
      </Box>)}
    </>

  )

};
