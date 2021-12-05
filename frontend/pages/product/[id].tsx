import { useRouter } from 'next/router';
import ProductDetailed from '../../components/ProductDetailed';

export default function SingleProductPage() {
  const { query } = useRouter();
  let id = '';
  if (!query) {
    return <p>Page Not Found</p>;
  }
  if (query.id && typeof query.id === 'string') {
    id = query.id;
  }
  return <ProductDetailed id={id} />;
}
