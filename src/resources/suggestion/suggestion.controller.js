import Sequelize from 'sequelize';
import request from 'request';
import 'request-promise-native';
import lodash from 'lodash';
import Game from '../game/game.model.js';
import { boardgameApi, clientId } from '../../config/index.js';

const { union } = lodash;
const { Op } = Sequelize;

/**
 * use /game-names from atlas api
 * use db to search which are contained
 * format and unify answers
 */
export const handleSuggestion = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({
      error: 'Required query to get suggestions',
    });
    return;
  }

  // get suggestions from DB
  const dbGames = await Game.findAll({
    where: {
      name: {
        [Op.like]: `%${q}%`,
      },
      atlasId: null,
    },
  });
  const dbGameNames = dbGames.map(dbGame => ({
    name: dbGame.dataValues.name,
    isVerified: false,
  }));

  // get suggestions from atlas api
  const apiGames = await request({
    url: `${boardgameApi}/game-names?name=${q}&client_id=${clientId}&limit=5`,
    json: true,
  });
  const apiGameNames = apiGames.names.map(name => ({
    name,
    isVerified: true,
  }));

  res.json(union(apiGameNames, dbGameNames));
};
