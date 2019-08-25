const { Levels } = require('../database/models');

const all = async () => {
  const list = await Levels.findAll();
  return list;
};

const one = async (id) => {
  const item = await Levels.findOne({ where: { id } });
  return item;
};

const byCompany = async (company) => {
  const list = await Levels.findAll({ where: { company } });
  return list;
};

const store = async (provider) => {
  const item = await Levels.create({
    name: provider.name,
    description: provider.description,
    discount: provider.discount,
    company: provider.company,
  });
  return item;
};

const update = async (id, provider) => {
  let item = await Levels.update({
    name: provider.name,
    description: provider.description,
    discount: provider.discount,
    company: provider.company,
  }, { where: { id } });

  if (item[0] === 1) {
    item = await Levels.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (id) => {
  let item = await Levels.findOne({ where: { id } });
  if (item) {
    await Levels.destroy({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

module.exports = {
  all,
  byCompany,
  one,
  store,
  update,
  destroy,
};
