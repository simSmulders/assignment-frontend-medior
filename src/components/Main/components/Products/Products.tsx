import { useGetFruitsQuery, useGetVegetablesQuery } from "app/api";
import { useMemo } from "react";

export interface ProductsProps {};

export const Products = (props:ProductsProps) => {

  const { data: fruits } = useGetFruitsQuery();
  const { data: vegetables } = useGetVegetablesQuery();

  const rows = useMemo(() => {
    if (!fruits || !vegetables) {
      return;
    }
    return fruits.concat(vegetables)
  }, [ fruits, vegetables ])

  return (
    <>
      {rows && (
        <ul>
          {rows.map(row => <li key={row.id}>{row.name}</li>)}
        </ul>
      )}
    </>
    
  )

};
