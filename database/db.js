/**
 * Please note that the code commented below is for information purpose only
 * to show how the dataset was built.
 */

import sequelize from "sequelize";
import faker from "faker";

const connection = new sequelize("carizi", "root", "root", {
  dialect: "mysql",
  host: "localhost"
});

// Data model

const user = connection.define("user", {
  firstName: {
    type: sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const rankList = connection.define("rankList", {
  rankType: {
    type: sequelize.STRING,
    allowNull: false
  }
});

// Associations

rankList.hasMany(user);
user.belongsTo(rankList);

// Data generation

const rankSet = ["OR", "Argent", "Bronze"];

connection.sync({ force: true }).then(() => {
  for (let i = 0; i < 50; ++i) {
    const min = Math.ceil(0);
    const max = Math.floor(2);
    const rankIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    rankList
      .create({
        rankType: rankSet[rankIndex]
      })
      .then(rankList => {
        rankList.createUser({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email()
        });
      });
  }
});

export default connection;
