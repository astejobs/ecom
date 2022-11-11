import { Product } from "./product";
import { Productweightprice } from "./productweightprice";

export class BasketItem {
  id:string;
  product:any;
  productWeightPr:Productweightprice;
  quantity:number;
  price:number;
}
