import { OrderBase } from '../types';

export type CreateOrderDto = OrderBase;
export type EditOrderDto = Partial<CreateOrderDto>;
