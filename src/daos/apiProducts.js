import Data from "../contenedores/apiClass.js";
import Product from "../DB/models/products.js";

export class Products extends Data {
  constructor() {
    super();
  }
  async getProduct() {
    const listProducts = await Product.find();
    return listProducts;
  }
  async getById(id) {
    const getproduct = await Product.findById(id);
    return getproduct;
  }
}
