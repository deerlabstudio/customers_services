const { CustomersAddress } = require('../database/models');

const all = async (customer) => {
  const list = await CustomersAddress.findAll({ where: { customersId: customer } });
  return list;
};

const one = async (customer, id) => {
  const item = await CustomersAddress.findOne({ where: { id, customersId: customer } });
  return item;
};

const store = async (customer, address) => {
  const item = await CustomersAddress.create({
    first_line: address.first_line,
    second_line: address.second_line,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    default: address.default,
    status: true,
    customersId: customer,
  });
  return item;
};

const update = async (customer, id, address) => {
  let item = await CustomersAddress.update({
    first_line: address.first_line,
    second_line: address.second_line,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    default: address.default,
    status: address.status,
  }, { where: { id, customersId: customer } });

  if (item[0] === 1) {
    item = await CustomersAddress.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (customer, id) => {
  let item = await CustomersAddress.findOne({ where: { id, customersId: customer } });
  if (item) {
    await CustomersAddress.destroy({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

module.exports = {
  all,
  one,
  store,
  update,
  destroy,
};
