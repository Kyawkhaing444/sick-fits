import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductPage() {
  const { query } = useRouter();
  let page = 1;
  if (query && query.page && typeof query.page === 'string') {
    page = parseInt(query.page);
  }
  return (
    <>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </>
  );
}
