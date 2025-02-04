import { useMemo} from "react";
import { Box, Chip } from '@mui/material';
import {
  DataGrid,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams
} from '@mui/x-data-grid';
import {
  useGetFruitsQuery,
  useGetVegetableTagsQuery,
  useGetVegetablesQuery,
  useGetFruitTagsQuery
} from "app/api";

export interface ProductsProps {
  name: string,
  description: string,
  tags: string[]
  onStateChange: (state:{ name: string, description: string, tags: string[]}) => void
};

export const Products = (props:ProductsProps) => {

  const { onStateChange } = props;

  const { data: fruits, isLoading: isLoadingFruits } = useGetFruitsQuery();
  const { data: vegetables, isLoading: isLoadingVegetables } = useGetVegetablesQuery();
  const { data: fruitTags } = useGetFruitTagsQuery();
  const { data: vegetableTags } = useGetVegetableTagsQuery();

  const rows = useMemo(() => {
    if (!fruits || !vegetables) {
      return;
    }
    return fruits.concat(vegetables).filter(product => !product.isArchived)
  }, [ fruits, vegetables ]);

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
      width: 120
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 170,
      valueGetter: getTags,
      renderCell: (params: GridRenderCellParams) => (
        params.value ? params.value.map((val: string) => {
          return (
            <Box m='2px'>
              <Chip
                key={val}
                label={val}
                color={getColor(val)}
              />
            </Box>)
        }) : null
      )
    }
  ]

  const onRowClick = (params: GridRowParams) => {

    const productTags = fruitTags?.concat(vegetableTags || []);
    const tags = params.row.tags.map((val:string) => productTags?.find(tag => tag.id === val)?.name)

    onStateChange({...params.row, tags});
  }

  const isLoadingProducts = isLoadingFruits && isLoadingVegetables;

  return (
    <>
      (<Box sx={{ height: 900, width: '100%' }}>
        <DataGrid
          sx={{
            '.MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold !important',
              overflow: 'visible !important'
            }
          }}
          rows={rows ? rows : []}
          loading={isLoadingProducts}
          columns={columns}
          hideFooter
          onRowClick={onRowClick}
        />
      </Box>)
    </>

  )

};
