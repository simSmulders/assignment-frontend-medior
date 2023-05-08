import { Box, Typography } from "@mui/material"

export const ProductView = ({...productState}) => {

  const { state } = productState;

  const { name, description, tags } = state;

  return (
    <Box m={4} flexGrow={1} alignItems="center" >
      <Typography variant="h2">Selected product:</Typography>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5">{description}</Typography>
      <ul>
        {tags?.map((tag: string) => <li key={tag}>{tag}</li> )}
      </ul>

    </Box>
  )
}