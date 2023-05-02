import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Tag } from 'types/Tag';
import { Fruit } from 'types/Fruit';
import { useAddVegetableMutation, useAddFruitMutation } from 'app/api';
import { Vegetable } from 'types/Vegetable';

type FormValues = {
  name: string;
  description: string;
  tags: string[]
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: 'required',
            message: 'Name is required.',
          },
        }
      : {},
  };
};

export interface ProductProps {
  type: string;
  tags: string[];
  selectedProduct: Fruit | Vegetable;
  productTags: Tag[]
};

export const ProductForm = (props:ProductProps) => {

  const { productTags, type } = props;

  const [ tagsChecked , setTagsChecked ] = useState({
     ...productTags
  })

  const [ addVegetable ] = useAddVegetableMutation();
  const [ addFruit ] = useAddFruitMutation();

  const handleChangeTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagsChecked({
      ...tagsChecked,
      [event.target.name]: event.target.checked
    });
  };

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => type === 'fruit' ? addFruit(data) : addVegetable(data));

    return (<>
      <Box m={5}>
        <Typography variant="h4" gutterBottom display="flex" justifyContent="center">
          Add Product
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column" 
          alignItems="center"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '400px' }
          }}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Name"
                placeholder="Name"
                {...register("name")} 
              />
              {errors?.name && <p>{errors.name.message}</p>}
            </div>
            <div>
            <TextField
                id="outlined-required"
                label="Description"
                placeholder="Description"
                {...register("description")}
              />
            </div>
            <div>
              <FormGroup sx={{ flexDirection: 'row', m: 1 }}>
                {productTags && productTags.map(tag => (
                  <FormControlLabel control={<Checkbox onChange={handleChangeTag} />} label={tag.name} key={tag.id}   />
                ))}
              </FormGroup>
            </div>
            <div>
              <Button variant="contained" type="submit">Add</Button>
            </div>
        </Box>
      </Box>
    </>);
}