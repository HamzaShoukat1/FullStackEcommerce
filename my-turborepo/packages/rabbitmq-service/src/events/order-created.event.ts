export interface OrderCreatedEvent {
  orderId: string;
  userId: number;
  email: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}