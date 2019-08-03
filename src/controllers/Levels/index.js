const boom = require('boom');
const levelsRepository = require('../../repositories/levels-repository');

class LevelsController {
  constructor(router) {
    this.router = router;
    this.router.get('/levels', this.getAllLevels);
    this.router.get('/levels/:id', this.getOneLevels);
    this.router.post('/levels', this.storeLevels);
    this.router.put('/levels/:id', this.updateLevels);
    this.router.delete('/levels/:id', this.destroyLevels);
  }

  async getAllLevels(req, res, next) {
    try {
      const list = await levelsRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneLevels(req, res, next) {
    try {
      const { id } = req.params;
      const item = await levelsRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeLevels(req, res, next) {
    try {
      const { body } = req;
      const item = await levelsRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateLevels(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const item = await levelsRepository.update(id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyLevels(req, res, next) {
    try {
      const { id } = req.params;
      const item = await levelsRepository.destroy(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = LevelsController;
