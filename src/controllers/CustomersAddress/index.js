const boom = require('boom');
const customersAddressRepository = require('../../repositories/customersaddress-repository');

class ProvidersAddressController {
  constructor(router) {
    this.router = router;
    this.router.get('/customers/:customer/address', this.getAllCustomersAddress);
    this.router.get('/customers/:customer/address/:id', this.getOneCustomersAddress);
    this.router.post('/customers/:customer/address', this.storeCustomersAddress);
    this.router.put('/customers/:customer/address/:id', this.updateCustomersAddress);
    this.router.delete('/customers/:customer/address/:id', this.destroyCustomersAddress);
  }

  async getAllCustomersAddress(req, res, next) {
    try {
      const { customer } = req.params;
      const list = await customersAddressRepository.all(customer);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneCustomersAddress(req, res, next) {
    try {
      const { customer, id } = req.params;
      const item = await customersAddressRepository.one(customer, id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeCustomersAddress(req, res, next) {
    try {
      const { customer } = req.params;
      const { body } = req;
      const item = await customersAddressRepository.store(customer, body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateCustomersAddress(req, res, next) {
    try {
      const { id, customer } = req.params;
      const { body } = req;
      const item = await customersAddressRepository.update(customer, id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyCustomersAddress(req, res, next) {
    try {
      const { id, customer } = req.params;
      const item = await customersAddressRepository.destroy(customer, id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProvidersAddressController;
