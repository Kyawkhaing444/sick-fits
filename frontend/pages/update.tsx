import UpdateProduct from '../components/UpdateProduct';

interface PropType {
  query: {
    id: string;
  };
}

export default function UpdateProductPage({ query }: PropType) {
  return <UpdateProduct id={query.id} />;
}
