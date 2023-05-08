import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"

export const ProductView = ({...productState}) => {

  const { state } = productState;

  const { name, description, tags } = state;

  return (
    <Box m={4}>
      <Card>
        <CardContent>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="h6">{description}</Typography>
          <ul>
            {tags?.map((tag: string) => <li key={tag}>{tag}</li> )}
          </ul>
        </CardContent>
        <CardActions>
          <Button>Add to cart</Button>
        </CardActions>
      </Card>
    </Box>
  )
}