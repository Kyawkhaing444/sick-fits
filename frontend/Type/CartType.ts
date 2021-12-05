import { ProductType } from './ProductType';

export interface CartType {
  id: string;
  quantity: number;
  product: ProductType;
}
