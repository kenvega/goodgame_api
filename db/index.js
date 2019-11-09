import Sequelize from 'sequelize';
import { db } from '../config/index.js';

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',
  // for a single process
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const authenticateDb = () =>
  new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() =>
        console.log(
          `<< SETUP >> Connection to host localhost has been established successfully.`,
        ),
      )
      .then(() => {
        return resolve(
          sequelize.sync({
            force: true,
          }),
        );
      })
      .catch(err => {
        console.error(`<< ERROR >> Unable to connect to the database: ${err}`);
        reject(err);
      });
  });

export { sequelize, authenticateDb };
