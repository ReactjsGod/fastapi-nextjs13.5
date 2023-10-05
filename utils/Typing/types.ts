//interfaces
export interface Product {
  price: number;
  ID: Number;
  description: string;
  image: string[];
  productName: string;
  rating: number;
  _id: string;
}

export interface ProductUpdate{
  onUpdate:()=>void;
  editProduct:Product | null;
}

//types 
export type LocaleLayoutProps = {
    children: React.ReactNode;
    params: {
      locale: string;
    };
  };
  
  export type BasketProps = {
    scrolled: boolean;
    theme:string;
  };

  export type Item = {
    quantity: number;
    _id: string;
    title: string;
    price: number;
    description: string;
    images: string[]; 
  };

  export type Mobilemenuprop ={
    scrolled: boolean;
    theme:string;
    basketItems:Item[];
  }

  export type BasketState = {
    items: Item[];
  };