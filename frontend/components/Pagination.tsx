import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { perPage } from '../config';
import { ProductCount } from '../GraphQL/query/productCount';
import DisplayError from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';

interface PropType {
  page: number;
}

interface ProductCountReturnedType {
  count: number;
}

export default function Pagination({ page }: PropType) {
  const { error, data } = useQuery<{ _allProductsMeta: ProductCountReturnedType }>(ProductCount);
  if (error) <DisplayError error={error} />;
  let pageCount = 0;
  let count = 0;
  if (data) {
    count = data._allProductsMeta.count;
    pageCount = count / perPage;
  }
  return (
    <PaginationStyles>
      <head>
        <title>
          Sick Fits | Page {page} of {pageCount}
        </title>
      </head>
      <Link href="/">
        <a aria-disabled={page <= 1}> ← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href="/">
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}
