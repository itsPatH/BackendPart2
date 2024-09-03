export default class UserRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getUserByEmail(email) {
      if (!email || typeof email !== 'string') {
        throw new Error('Invalid email address');
      }
  
      try {
        const user = await this.dao.getOne({ email });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to get user by email: ${error.message}`);
      }
    }
  
    async getUserById(id) {
      if (!id) {
        throw new Error('User ID is required');
      }
  
      try {
        const user = await this.dao.getOne({ _id: id });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to get user by ID: ${error.message}`);
      }
    }
  
    async createUser(data) {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid user data');
      }
  
      try {
        const newUser = await this.dao.create(data);
        return newUser;
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    }
  }  