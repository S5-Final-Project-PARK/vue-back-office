export interface Order {
    Date: string;
    Dish: {
        id:number;
        name:string;
    };
    unit_price:number;
    unit:number;
    email: string;
    id: number;
  }