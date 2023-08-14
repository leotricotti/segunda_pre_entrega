import cartsModel from "../models/carts.model.js";

export default class Cart {
  // Método asyncrono para obtener todos los carritos
  getAll = async () => {
    let result = await cartsModel.find().lean();
    return result;
  };
  // Método asyncrono para obtener un carrito
  getOne = async (id) => {
    let result = await cartsModel.findById(id).lean();
    return result;
  };
  // Método asyncrono para crear un carrito
  saveCart = async (cart) => {
    let result = await cartsModel.create(cart);
    return result;
  };
  // Método asyncrono para eliminar un producto del carrito
  updateCart = async (id, cart) => {
    let result = await cartsModel.updateOne({ _id: id }, cart);
    return result;
  };
  // Método asyncrono para vaciar el carrito
  emptyCart = async (id, cart) => {
    let result = await cartsModel.updateOne({ _id: id }, cart);
    return result;
  };
  // Método asyncrono para popular el carrito
  populatedCart = async (id) => {
    let result = await cartsModel.findById(id).populate("products.product");
    return result;
  };
}
