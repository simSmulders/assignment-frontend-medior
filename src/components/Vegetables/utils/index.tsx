import { GridValueGetterParams } from '@mui/x-data-grid';
import { Tag } from 'types/Tag';

export const getColumns = (vegetableTags: Tag[]) => {

  const getTags = (params: GridValueGetterParams) => {

    if (!params.value) {
      return '-'
    }

    return params.value.map((val:string) => vegetableTags.find(tag => tag.id === val)?.name)
  }

  return [
  {
    field: 'name',
    headerName: 'Title',
    width: 100
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 500,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 500,
    valueGetter: getTags
  }
]};
