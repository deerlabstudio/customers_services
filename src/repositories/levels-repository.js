const { Levels } = require('../database/models');

const all = async () => {
  const list = await Levels.findAll();
  return list;
};

const one = async (id) => {
  const item = await Levels.findOne({ where: { id } });
  return item;
};

const store = async (provider) => {
  const item = await Levels.create({
    name: provider.name,
    description: provider.description,
    discount: provider.discount,
  });
  return item;
};

const update = async (id, provider) => {
  let item = await Levels.update({
    name: provider.name,
    description: provider.description,
    discount: provider.discount,
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
  one,
  store,
  update,
  destroy,
};
