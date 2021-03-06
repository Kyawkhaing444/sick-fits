import Link from 'next/link';
import { ProductType } from '../Type/ProductType';
import ItemStyle from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';
import { formatMoney } from '../lib/formatMoney';
import DeleteButton from './DeleteButton';
import { AddToCart } from './AddToCart';

interface PropType {
  product: ProductType;
}
export default function Product({ product }: PropType) {
  return (
    <ItemStyle>
      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit
        </Link>
        <AddToCart id={product.id} />
        <DeleteButton id={product.id}>Delete</DeleteButton>
      </div>
    </ItemStyle>
  );
}
