const { getAllProducts } = require('../../services/customer/customerGetProducts');

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = { getProducts };