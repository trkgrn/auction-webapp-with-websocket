import {Bid} from "./Bid";

export class Product {
  productId?: string;
  productName?: string;
  description?: string;
  startPrice?: number;
  currentPrice?: number;
  increment?: number;
  bids?: Bid[];
}
