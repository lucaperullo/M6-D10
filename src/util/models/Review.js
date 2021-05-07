module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 3,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    { timestamps: true }
  );
  Review.associate = (models) => {
    Review.belongsTo(models.Product);
  };
  return Review;
};
