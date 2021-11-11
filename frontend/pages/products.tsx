import Pagination from '../components/Pagination';
import Products from '../components/Products';

export default function ProductPage() {
  return (
    <>
      <Pagination page={1} />
      <Products />
      <Pagination page={3} />
    </>
  );
}
