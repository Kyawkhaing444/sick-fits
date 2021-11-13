import { FieldPolicy } from '@apollo/client';
import { ProductCountReturnedType } from '../components/Pagination';
import { ProductCount } from '../GraphQL/query/productCount';
import { ProductsWithPaginationPara } from '../GraphQL/query/productWithPagination';

interface ExistingFieldType {
  __ref: string;
}

export function paginationField(): FieldPolicy {
  return {
    keyArgs: false,
    read(existing: (ExistingFieldType | null)[] = [], { args, cache }) {
      const { skip = 0, first = 0 } = args as ProductsWithPaginationPara;

      const resCount = cache.readQuery<{ _allProductMeta: ProductCountReturnedType }>({
        query: ProductCount,
      });
      const itemCount = resCount?._allProductMeta?.count ?? 0;
      const pageCount = Math.ceil(itemCount / first);
      const page = skip / first + 1;

      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length < first && page === pageCount) {
        return items;
      }

      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        return items;
      }

      return false;
    },
    merge(existing: (ExistingFieldType | null)[], incoming: (ExistingFieldType | null)[], { args }) {
      const { skip = 0 } = args as ProductsWithPaginationPara;

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; i += 1) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
