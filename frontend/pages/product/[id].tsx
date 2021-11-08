import ProductDetailed from '../../components/ProductDetailed';

interface PropType {
  query: {
    id: string;
  };
}

export default function SingleProductPage({ query }: PropType) {
  return <ProductDetailed id={query.id} />;
}
