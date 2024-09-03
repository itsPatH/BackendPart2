export default class TicketRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async create(amount, purchaser) {
      if (amount == null || purchaser == null) {
        throw new Error('Both amount and purchaser are required');
      }
      
      try {
        const ticketData = { amount, purchaser, code: this.generateCode() };
        return await this.dao.create(ticketData);
      } catch (error) {
        throw new Error(`Failed to create ticket: ${error.message}`);
      }
    }
  
    generateCode() {
      return `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
  }  