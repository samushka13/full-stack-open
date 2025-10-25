import User from "./user.js";
import Blog from "./blog.js";
import BlogList from "./blogList.js";
import ReadingList from "./readingList.js";
import Session from "./session.js";

User.hasMany(Blog);
Blog.belongsTo(User);
Blog.belongsToMany(ReadingList, { through: BlogList });
ReadingList.belongsToMany(Blog, { through: BlogList, as: "readings" });
ReadingList.belongsTo(User);
User.hasOne(ReadingList);
User.hasOne(Session);

export default { User, Blog, BlogList, ReadingList, Session };
