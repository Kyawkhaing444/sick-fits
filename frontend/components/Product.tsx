import Link from 'next/link';
import { ProductType } from '../Type/ProductType';
import ItemStyle from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';
import { formatMoney } from '../lib/formatMoney';

interface PropType {
  product: ProductType;
}
export default function Product({ product }: PropType) {
  return (
    <ItemStyle>
      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
      <Title>
        <Link href={`/product/${product.id}`}>
          <a> {product.name}</a>
        </Link>
      </Title>
      <p>{product.description}</p>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
    </ItemStyle>
  );
}
