import { ProductBase } from "../types";

export type  CreateProductDto = ProductBase
export type EditProductDto = Partial<CreateProductDto>