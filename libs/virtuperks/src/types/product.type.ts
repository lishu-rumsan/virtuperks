import { CommonFields } from './common.type';
import { Order } from './order.type';

export type ProductBase = {
  itemName: string;
  description: string;
  category: string;
  orders: Order[];
  availability: boolean;
};

export type Product = ProductBase & CommonFields & { cuid?: string };
