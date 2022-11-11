import { Order } from "./order";
import { Product } from "./product";
import { Productweightprice } from "./productweightprice";

export class OdrProduct {
  id:number;
  product:any;
  quantity:number;
  productWeightPrice:Productweightprice;

}
