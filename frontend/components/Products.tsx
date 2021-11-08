/* eslint-disable no-console */
import { QueryResult, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { AllProductQuery } from '../GraphQL/query/allProducts';
import { AllProductType } from '../Type/ProductType';
import Product from './Product';

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading }: QueryResult<AllProductType> = useQuery(AllProductQuery);
  if (loading) return <p>loading ..... </p>;
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <ProductsContainer>
        {data?.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </div>
  );
}
