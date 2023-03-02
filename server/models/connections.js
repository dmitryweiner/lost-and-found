const createConnections = sequelize => {
  const {User, Token, Photo, Tag} = sequelize.models;

  User.hasOne(Token);
  Token.belongsTo(User);

  User.hasMany(Photo);
  Photo.belongsTo(User);

  User.hasMany(Tag);
  Tag.belongsTo(User);

  Photo.belongsToMany(Tag, { through: 'Photo_To_Tag' });
  Tag.belongsToMany(Photo, { through: 'Photo_To_Tag' });
}

module.exports = createConnections;
