const Product = require('../schema/product');

exports.getList = async () => {
  return (await Product.find({})).map(product => {
    const { _id, name, photoUrls, price } = product;
    return { id: _id, name, photoUrls, price };
  });
};

exports.getProduct = async ({ productId }) => {
  const product = await Product.findById(productId);

  if (!product) throw new Error('존재하지 않는 상품입니다.');

  const { _id, name, description, photoUrls, price, colors, sizes } = product;
  return { id: _id, name, description, photoUrls, price, colors, sizes };
};

exports.createProduct = async ({ name, description, photoUrls, price, colors, sizes }) => {
  if (await Product.findOne({ name })) throw new Error(`${name} 상품이 이미 존재합니다.`);

  const product = await new Product({ name, description, photoUrls, price, colors, sizes }).save();

  return product._id;
};
