import Sequelize from 'sequelize';
import { sequelize } from '../../utils/db.js';

const Game = sequelize.define(
  'game',
  {
    // attributes
    atlasId: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    minPlayers: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    maxPlayers: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    minPlaytime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    maxPlaytime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // options
  },
);

export default Game;
