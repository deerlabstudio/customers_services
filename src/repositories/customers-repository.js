const { Op } = require('sequelize');
const { Customers, Levels } = require('../database/models');

const all = async () => {
  const list = await Customers.findAll();
  return list;
};

const byCompany = async (company) => {
  const list = await Customers.findAll({
    where: {
      company,
    },
    include: [
      {
        model: Levels,
        as: 'level',
      },
    ],
  });
  return list;
};

const findByTextAndCompany = async (company, text) => {
  const list = await Customers.findAll({
    where: {
      company,
      [Op.or]: [
        { name: { [Op.like]: `%${text}%` } },
        { code: { [Op.like]: `%${text}%` } },
      ],
    },
    include: [
      {
        model: Levels,
        as: 'level',
      },
    ],
  });
  return list;
};

const one = async (id) => {
  const item = await Customers.findOne({ where: { id } });
  return item;
};

const store = async (provider) => {
  const item = await Customers.create({
    name: provider.name,
    email: provider.email,
    phone: provider.phone,
    avatar: '',
    code: provider.code,
    company: provider.company,
    isCompany: provider.isCompany,
    status: true,
    levelsId: provider.levelsId,
  });
  return item;
};

const update = async (id, provider) => {
  let item = await Customers.update({
    name: provider.name,
    email: provider.email,
    phone: provider.phone,
    avatar: provider.avatar,
    code: provider.code,
    company: provider.company,
    isCompany: provider.isCompany,
    status: provider.status,
    levelsId: provider.levelsId,
  }, { where: { id } });

  if (item[0] === 1) {
    item = await Customers.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (id) => {
  let item = await Customers.findOne({ where: { id } });
  if (item) {
    await Customers.destroy({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

module.exports = {
  all,
  byCompany,
  findByTextAndCompany,
  one,
  store,
  update,
  destroy,
};
