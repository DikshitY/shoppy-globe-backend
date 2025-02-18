import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// controller for getting all cart items
export const getCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: req.user.userId }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller for adding item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if cart exists for the user
    let cart = await cartModel.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = new cartModel({ userId: req.user.userId, products: [] });
    }

    // Check if product is already in cart
    const existingProduct = cart.products.find((item) =>
      item.productId.equals(productId)
    );

    if (existingProduct) {
      existingProduct.quantity += quantity; // Update quantity if already in cart
    } else {
      cart.products.push({ productId, quantity }); // Add new product
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller for updatin item quantity in the cart
export const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params; // Product ID

    let cart = await cartModel.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = cart.products.find((item) => item.productId.equals(id));

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity = quantity; // Update quantity
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller for removing particular item from the cart using product ID
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // Product ID

    let cart = await cartModel.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter((item) => !item.productId.equals(id)); // Remove product from cart

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// removing cart for particular user ( additional controller but not used it as it was not mentioned in the project doc )
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
