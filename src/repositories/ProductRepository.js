export default class ProductRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getAllProducts() {
      try {
        return await this.dao.get();
      } catch (error) {
        throw new Error(`Failed to get all products: ${error.message}`);
      }
    }
  
    async getPaginatedProducts(params) {
      try {
        return await this.dao.paginate(params);
      } catch (error) {
        throw new Error(`Failed to get paginated products: ${error.message}`);
      }
    }
  
    async getProductById(id) {
      if (!id) {
        throw new Error('Product ID is required');
      }
      try {
        const product = await this.dao.getOne({ _id: id });
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      } catch (error) {
        throw new Error(`Failed to get product by ID: ${error.message}`);
      }
    }
  
    async find(params, operation) {
      try {
        return await this.dao.find(params, operation);
      } catch (error) {
        throw new Error(`Failed to find products: ${error.message}`);
      }
    }
  
    async updateById(id, updates) {
      if (!id || !updates) {
        throw new Error('Product ID and updates are required');
      }
      try {
        const result = await this.dao.updateOne({ _id: id }, { $set: updates });
        if (!result) {
          throw new Error('Failed to update product');
        }
        return result;
      } catch (error) {
        throw new Error(`Failed to update product by ID: ${error.message}`);
      }
    }
  
    async createProduct(product) {
      if (!product || !product.title || !product.price) {
        throw new Error('Product data is incomplete');
      }
      try {
        return await this.dao.create(product);
      } catch (error) {
        throw new Error(`Failed to create product: ${error.message}`);
      }
    }
  
    async updateStock(id, newStock) {
      if (!id || newStock == null) {
        throw new Error('Product ID and new stock value are required');
      }
      try {
        const result = await this.dao.updateOne({ _id: id }, { $set: { stock: newStock } });
        if (!result) {
          throw new Error('Failed to update product stock');
        }
        return result;
      } catch (error) {
        throw new Error(`Failed to update product stock: ${error.message}`);
      }
    }
  
    async deleteProduct(id) {
      if (!id) {
        throw new Error('Product ID is required');
      }
      try {
        const result = await this.dao.deleteOne({ _id: id });
        if (!result) {
          throw new Error('Failed to delete product');
        }
        return result;
      } catch (error) {
        throw new Error(`Failed to delete product by ID: ${error.message}`);
      }
    }
  }  