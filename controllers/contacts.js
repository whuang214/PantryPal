const User = require('../models/user');
const List = require('../models/GroceryList');


module.exports = {
    index,
    searchUsers,
    addToList,
    shareList,
}

// render add page
function index(req, res) {
    res.render('contacts/index', { title: 'Add Contact', users: [], searched: false });
}

// Search users based on query
async function searchUsers(req, res) {
    const query = req.query.query.toLowerCase(); // Convert the search query to lowercase
  
    try {
      // Search for users matching the lowercase query
      const users = await User.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for name
          { email: { $regex: query, $options: 'i' } }, // Case-insensitive search for email
        ],
      });
  
      res.render('contacts/index', { title: 'Add Contact', users, searched: true });
    } catch (error) {
      console.error(error);
      res.render('contacts/index', { title: 'Add Contact', users: [], searched: true });
    }
  }
  

// render add to list page
async function addToList(req, res) {
  try {
    const clickedUser = await User.findById(req.params.id);
    const currentUserList = await List.find({ owner: req.user._id });
    res.render('contacts/add', { title: 'Add Contact', clickedUser, currentUserList});

  } catch(err) {
    console.log(err);
    res.redirect('/contacts');
  }
}

// share list with user
async function shareList(req, res) {
  try {
    const clickedUser = await User.findById(req.params.id);
    const list = await List.findById(req.body.list);
    list.sharedList.push(clickedUser._id);
    await list.save();
    res.redirect(`/lists/${list._id}`);
  } catch(err) {
    console.log(err);
    res.redirect('/contacts');
  }
}