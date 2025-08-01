
const PhotoModel = require("../models/products")

const filters = async (req, res) => {

  const { name, imagename, pricerange, sortbyname, sortbyprice, sortbydateuploaded } = req.query;
  const priceSort = sortbyprice?.split(" ").join("");
  const userId = req.userId;
  let range = Number(pricerange);

  let productsQuery = PhotoModel.find({ user: { $ne: userId } });


  if (name) {
    productsQuery = productsQuery.where('firstname').equals(name);
  }
  if (imagename) {
    productsQuery = productsQuery.where('imagename').equals(imagename);
  }
  if (pricerange) {
    productsQuery = productsQuery.where('price').lte(range);
  }

  // Sorting by name (A-Z or Z-A)
  if (sortbyname) {
    if (sortbyname === "A-Z") {
      productsQuery = productsQuery.sort({ imagename: 1 }).collation({ locale: 'en', strength: 2 });
    }
    if (sortbyname === "Z-A") {
      productsQuery = productsQuery.sort({ imagename: -1 }).collation({ locale: 'en', strength: 2 });
    }
  }

  // Sorting by price (low to high or high to low)
  if (priceSort) {
    if (priceSort === "lowtohigh") {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (priceSort === "hightolow") {
      productsQuery = productsQuery.sort({ price: -1 });
    }
  }

  // Sorting by date uploaded (latest or oldest)
  if (sortbydateuploaded) {
    if (sortbydateuploaded === "latest") {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    } else if (sortbydateuploaded === "oldest") {
      productsQuery = productsQuery.sort({ createdAt: 1 });
    }
  }

  try {
    // Execute the query and get the result
    const products = await productsQuery.exec();
    res.json({ products, hits: products.length });
  } catch (error) {
    res.send(`An error occurred: ${error}`);
  }
}

module.exports = {
  filters
}