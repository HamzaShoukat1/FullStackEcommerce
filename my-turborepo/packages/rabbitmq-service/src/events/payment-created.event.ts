export interface PaymentCreatedEvent {


    userId: string 
    email: string;
    amount: number
    status: string;
    shippingAddress: any;
    items:  {
        productId:string
        quantity:number;
        price:number
        }[]


    }
