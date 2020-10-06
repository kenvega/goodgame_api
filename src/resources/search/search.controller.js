import request from 'request';
import 'request-promise-native';
import camelKeys from '../../utils/camelCase.js';
import { boardgameApi, clientId } from '../../config/index.js';

/**
 * use /search from atlas api
 * return games
 */
export const handleSearch = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({
      error: 'Required query to get search results',
    });
    return;
  }

  // get games from atlas api
  const apiGames = await request({
    url: `${boardgameApi}/search?name=${q}&client_id=${clientId}&limit=5`,
    json: true,
  });

  // format before sending to FE
  apiGames.games = apiGames.games.map(game => {
    const aux = { ...game };
    aux.numRatings = aux.num_user_ratings;
    aux.averageRating = aux.average_user_rating;
    return camelKeys(aux);
  });

  res.json(apiGames);

  // get games from DB that don't have an id
  // const dbGames = await Game.findAll({
  //   where: {
  //     name: {
  //       [Op.like]: `%${q}%`,
  //     },
  //     atlasId: null,
  //   },
  // });
  // const dbGamesValues = dbGames.map(game => game.dataValues);
  // console.log('dbGamesValues: ', dbGamesValues);

  // create only the ones that don't appear yet
  // Game.bulkCreate(
  //   apiGames.games.map(
  //     ({
  //       id,
  //       name,
  //       min_players: minPlayers,
  //       max_players: maxPlayers,
  //       min_playtime: minPlaytime,
  //       max_playtime: maxPlaytime,
  //       description,
  //     }) => ({
  //       atlasId: id,
  //       name,
  //       minPlayers,
  //       maxPlayers,
  //       description,
  //       minPlaytime,
  //       maxPlaytime,
  //     }),
  //   ),
  // );
};
