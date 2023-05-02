
export const getColumns = (tags: string[]) => {

  console.log(tags);

  return [
  {
    field: 'name',
    headerName: 'Title',
    width: 100
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 250
  }
]};
