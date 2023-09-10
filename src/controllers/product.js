const ProductService = require('../services/product');

exports.getList = async (req, res, next) => {
  try {
    res.status(200).json(await ProductService.getList());
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    req.validate(req.body, ['productId']);

    const productInfo = await ProductService.getProduct(req.body);

    res.status(200).json(productInfo);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    req.validate(req.body, ['name', 'description', 'photoUrls', 'price', 'sizes', 'colors']);

    const productId = await ProductService.createProduct(req.body);

    res.status(200).json({ productId });
  } catch (err) {
    next(err);
  }
};

exports.uploadPhoto = async (req, res, next) => {
  try {
    res.json({ url: req.file.path.substring(6) });
  } catch (err) {
    next(err);
  }
};
