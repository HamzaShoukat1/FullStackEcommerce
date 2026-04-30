export type ProductDTO = {
  id: number;
  name: string;
  shortDescription: string;
  description: string;

  price: number;

  sizes: string[];
  colors: string[];

  images: Record<string, string>;

  categorySlug: string | null;

  createdAt: string;
  updatedAt: string;
};

export type CartItemDTO = {
    id: number;
  productId: string;
  name: string;

  price: number;
  quantity: number;

  selectedSize: string;
  selectedColor: string;
    images: Record<string, string>;


};

export type OrderItemDTO = {
  productId: string;
  name: string;

  price: number;
  quantity: number;

  selectedSize: string;
  selectedColor: string;
};

export type OrderDTO = {
  id: number;
  userId: number;

  items: OrderItemDTO[];

  total: number;
  status: 'PENDING' | 'PAID' | 'FAILED';
  createdAt: string;
};

export type PaymentDTO = {
  id: number;
  orderId: string;

  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';

  createdAt: string;

};