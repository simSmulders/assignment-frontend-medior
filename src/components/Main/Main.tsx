import { useState } from 'react';
import styled from 'styled-components';
import { Products } from './components/Products';
import { ProductView } from './components/ProductView';
import { ProductSpeedDial } from './components/SpeedDial';

const App = styled.div`
  display: grid;
  grid-template:
        "products product-view cart" 50%
        "products product-view recent" 50%/ 300px 1fr 300px;
  height: 100vh;

  .products {
    grid-area: products;
    background-color: lightblue;
  }

  .product-view {
    grid-area: product-view;
  }

  .cart {
    grid-area: cart;
    background-color: lightgray;
  }

  .recent-products {
    grid-area: recent;
    background-color: lightgreen
  }
`

export const Main = () => {

    const [ productState, setProductState ] = useState({});

    const handleStateChange = (productState:{
      name: string,
      description: string,
      tags: string[]
    }) => {
      console.log(productState);
      setProductState({ ...productState })
    }

    return (<App>
        <div className="products">
          <Products name="" description='' tags={[]} onStateChange={handleStateChange} />
        </div>
        <div className="product-view">
          <ProductView state={productState} />
        </div>
        <div className="cart"></div>
        <div className="recent-products">
          <div>
            <ProductSpeedDial />
          </div>
        </div>

    </App>)
}