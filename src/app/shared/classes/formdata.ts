import { Category } from "./category";
import { Productweightprice } from "./productweightprice";

export class Formdata {
  id:number;
  name:string;
  productStock:string;
  shortDescription:string;
  aboutProduct:string;
  description:string;
  //unit:Unit[]=[];
  category:Category;
  productweightprice:Productweightprice;
  flavour:string;
  discount:number;
  brand:string;
  packageInfo:string;
  productImages:String[]=[];
  //productImages:Image[]=[];
  images: any;
}
