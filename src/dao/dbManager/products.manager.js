import productsModel from "../models/products.model.js";

export default class Product {
  //Método asyncrono para obtener todos los productos
  getAll = async () => {
    let products = await productsModel.find().lean();
    return products;
  };
  //Método asyncrono para obtener un producto
  getOne = async (id) => {
    let product = await productsModel.findById(id);
    return product;
  };
  //Método asyncrono para crear un producto
  saveProducts = async (product) => {
    let result = await productsModel.create(product);
    return result;
  };
  //Método asyncrono para actualizar un producto
  updateProducts = async (id, product) => {
    let result = await productsModel.findByIdAndUpdate(id, product);
    return result;
  };
  //Método asyncrono para eliminar un producto
  deleteProducts = async (id) => {
    let product = await productsModel.findByIdAndDelete(id);
    return product;
  };
  //Método asyncrono para obtener los productos filtrados por categoría
  filteredProducts = async (category) => {
    let products = await productsModel.paginate(
      { category: category },
      { limit: 10, page: 1 }
    );
    return products;
  };
  //Método asyncrono para obtener los productos ordenados por precio
  orderedProducts = async (order) => {
    let products = await productsModel.aggregate([
      { $sort: { price: parseInt(order) } },
    ]);
    return products;
  };
  //Método asyncrono para obtener los productos paginados
  paginatedProducts = async (page) => {
    let products = await productsModel.paginate(
      {},
      { limit: 10, page: parseInt(page) }
    );
    return products;
  };
}
