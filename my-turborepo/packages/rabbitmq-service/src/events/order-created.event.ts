export class OrderCreatedEvent {
  orderId!: string;
  userId!: number;
  email!: string;
  items!: any[];
}