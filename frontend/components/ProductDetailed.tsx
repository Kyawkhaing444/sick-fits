import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import { ProductQuery } from '../GraphQL/query/product';
import { ProductType } from '../Type/ProductType';
import DisplayError from './ErrorMessage';

interface PropType {
  id: string;
}

const ProductDetailedStyle = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function ProductDetailed({ id }: PropType) {
  const { loading, error, data } = useQuery<{ Product: ProductType }>(ProductQuery, {
    variables: {
      id,
    },
  });
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  let Product: ProductType = {
    id: '',
    name: '',
    description: '',
    price: 0,
    status: '',
    photo: {
      image: {
        publicUrlTransformed: '',
      },
    },
  };
  if (!data) {
    return <DisplayError error={error} />;
  }
  if (data) {
    Product = data.Product;
  }
  return (
    <ProductDetailedStyle>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img src={Product.photo?.image.publicUrlTransformed} alt={Product.name} />
      <div className="details">
        <h1>{Product.name}</h1>
        <p>{Product.description}</p>
      </div>
    </ProductDetailedStyle>
  );
}
