export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: string;
  sizes: string[];
  colors: string[];
  description?: string;
  isPromotion?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export type Category = 
  | 'todos'
  | 'babydoll'
  | 'bodys'
  | 'calcinhas'
  | 'camisolas'
  | 'conjuntos'
  | 'croppeds';

export type Size = 'P' | 'M' | 'G' | 'GG' | 'Único';
