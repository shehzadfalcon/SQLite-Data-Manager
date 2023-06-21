const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class Agent extends Sequelize.Model {
  static associate(models) {
    Agent.hasMany(models.Review, { foreignKey: 'agentId' });
  }
}
Agent.init(
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photoUrl: {
      type: Sequelize.STRING
    },
    agentLicence: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    practiceAreas: {
      type: Sequelize.STRING
    },
    aboutMe: {
      type: Sequelize.TEXT
    }
  },
  {
    sequelize,
    modelName: 'Agents'
    // options
  }
);

// REVIEWS MODEL
class Review extends Sequelize.Model {
  static associate(models) {
    Review.belongsTo(models.Agent, { foreignKey: 'agentId' });
  }
}
Review.init(
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    agentId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Reviews'
    // options
  }
);

// ESTABLISH ASSOCIATION
Agent.associate({ Review });
Review.associate({ Agent });

module.exports = {
  sequelize,
  Agent,
  Review
};
