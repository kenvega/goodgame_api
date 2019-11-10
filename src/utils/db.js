import Sequelize from 'sequelize';
import { db } from '../config/index.js';

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',
  define: {
    charset: 'utf8mb4',
  },
  // for a single process
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const authenticateDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `<< SETUP >>`,
      `Connection to host localhost has been established successfully.`,
    );

    return sequelize.sync({ force: true });
  } catch (err) {
    console.error(`<< ERROR >> Unable to connect to the database: ${err}`);
    throw err;
  }
};

export { sequelize, authenticateDb };
