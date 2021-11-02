export interface PhotoType {
  id: string;
  image: {
    publicUrlTransformed: string;
  };
}
export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  photo: PhotoType;
}
export interface AllProductType {
  allProducts: Array<ProductType>;
}
