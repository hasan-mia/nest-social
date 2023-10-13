import config from './config';

const url = {};
// authentication
url.signUp = `${config.baseUrl}auth/signup`;
url.signIn = `${config.baseUrl}auth/signin`;
url.signOut = `${config.baseUrl}auth/signout`;
url.updatePass = `${config.baseUrl}auth/reset/password`;
// user information
url.allUser = `${config.baseUrl}user/get/all`; // [get]
url.userInfo = `${config.baseUrl}user/info`; // params as id
url.updateUser = `${config.baseUrl}user/update`; // [put] params as id
url.updateUserProfile = `${config.baseUrl}user/update/profile`; // [put] params as id
url.updateUserCover = `${config.baseUrl}user/update/cover`; // [put] params as id
url.deleteUser = `${config.baseUrl}user/delete`; // [delete] params as id

// Post api
url.getAllPost = `${config.baseUrl}post/all`; // [get]
url.getPostDetails = `${config.baseUrl}post`; // [get] id with parameters
url.createPost = `${config.baseUrl}post/create`; // [post]
url.updatePost = `${config.baseUrl}post/update`; // id with parameters  [put]
url.deletePost = `${config.baseUrl}post/delete`; // id with parameters  [put]

// Comment api
url.createComment = `${config.baseUrl}comment/create`; // [post]
url.updateComment = `${config.baseUrl}comment/update`; //  [put]
url.deleteComment = `${config.baseUrl}comment/delete`; // [delete]

// Reply api
url.createReply = `${config.baseUrl}reply/create`; // [post]
url.updateReply = `${config.baseUrl}reply/update`; //  [put]
url.deleteReply = `${config.baseUrl}reply/delete`; // [delete]

// Reaction api
url.postReaction = `${config.baseUrl}reaction/post`; // [post]
url.commentReaction = `${config.baseUrl}reaction/comment`; //  [post]
url.replytReaction = `${config.baseUrl}reaction/reply`; // [post]

// Notification api
url.createNotification = `${config.baseUrl}notification/create`; // [post]
url.getNotification = `${config.baseUrl}notification`; //  [get] params with id
url.createNotification = `${config.baseUrl}notification/read`; // [put]


export default url;