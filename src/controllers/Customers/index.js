const boom = require('boom');
const customersRepository = require('../../repositories/customers-repository');

class CustomersController {
  constructor(router) {
    this.router = router;
    this.router.get('/customers', this.getAllCustomers);
    this.router.get('/customers/:id', this.getOneCustomers);
    this.router.post('/customers', this.storeCustomers);
    this.router.put('/customers/:id', this.updateCustomers);
    this.router.delete('/customers/:id', this.destroyCustomers);
  }

  async getAllCustomers(req, res, next) {
    try {
      const list = await customersRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneCustomers(req, res, next) {
    try {
      const { id } = req.params;
      const item = await customersRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeCustomers(req, res, next) {
    try {
      const { body } = req;
      const item = await customersRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateCustomers(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const item = await customersRepository.update(id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyCustomers(req, res, next) {
    try {
      const { id } = req.params;
      const item = await customersRepository.destroy(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CustomersController;
