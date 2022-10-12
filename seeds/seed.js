const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


  // seed users, applying hooks so the passwords are hashed before saving to the server
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  
  // seed posts, giving them random users as author
  for (const thisPost of postData) {
    thisPost.user_id = users[Math.floor(Math.random() * users.length)].id;
    await Post.create(thisPost);
  }

  // seed comments
  await Comment.bulkCreate(commentData);

  console.log("\n Database seeded \n");

  process.exit(0);
};

seedDatabase();
