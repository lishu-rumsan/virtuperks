import { CommonFields } from './common.type';

export type OrderBase = {
  employeeCuid: string;
  itemCuid: string;
};

export type Order = OrderBase & CommonFields & { cuid?: string };
