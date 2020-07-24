import { BasketProduct } from './basketProduct.model';

export interface Sale {
    author: Number;
    client: Number;
    products: Array<BasketProduct>,
    deposited: Number,
    total: Number,
    remaining: Number,
    discount: Number,
    tax: Number
}