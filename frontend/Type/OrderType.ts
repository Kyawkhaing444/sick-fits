export interface OrderItemType {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  photo: {
    image: {
      publicUrlTransformed: string;
    };
  };
}

export interface OrderType {
  id: string;
  total: number;
  charge: string;
  user: {
    id: string;
  };
  items: OrderItemType[];
}
