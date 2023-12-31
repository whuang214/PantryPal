const Item = require("../models/GroceryItem");
const List = require("../models/GroceryList");

module.exports = {
  index,
  new: newItems,
  create,

  addItemPage,
  addItem,
  editItem,
  updateItem,

  deleteItem,
};

// going to the items page
async function index(req, res) {
  const items = await Item.find({});
  res.render("items/index", { title: "Item Database", items });
}

function newItems(req, res) {
  res.render("items/new", { title: "Add Item" });
}

// create item post
async function create(req, res) {
  const item = new Item(req.body);
  // console.log("added item->", item);
  try {
    await item.save();
    res.redirect("/items");
  } catch (err) {
    console.log(err);
    res.redirect("/items/new");
  }
}

// show add item page
async function addItemPage(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    const user = req.user;

    let lists = [];
    if (user) {
      const ownedLists = await List.find({ owner: user._id });
      const sharedLists = await List.find({ sharedList: { $in: [user._id] } });
      lists = ownedLists.concat(sharedLists);
    }

    res.render("items/add", { title: "Add to List", item, lists });
  } catch (err) {
    console.log(err);
    res.redirect("/items");
  }
}

// add item to list
async function addItem(req, res) {
  try {
    const itemId = req.params.id;
    const listId = req.body.list;
    const quantity = req.body.quantity;

    const item = await Item.findById(itemId);
    const list = await List.findById(listId);

    if (!item || !list) {
      throw new Error("Item or list not found");
    }

    // Check if the item is already in the list
    const existingItem = list.itemsList.find(
      (listItem) => listItem.item.toString() === itemId
    );

    if (existingItem) {
      // Item already exists in the list, update its quantity
      existingItem.quantity += Number(quantity);
    } else {
      // Item doesn't exist in the list, add it
      const listItem = {
        item: item._id,
        quantity: Number(quantity)
      };
      list.itemsList.push(listItem);
    }

    await list.save();

    res.redirect("/items");
  } catch (err) {
    res.send(err);
  }
}



// edit item page
async function editItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    res.render("items/edit", { title: "Edit Item", item });
  } catch (err) {
    console.log(err);
    res.redirect("/items");
  }
}

// edit item put
async function updateItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    item.name = req.body.name;
    item.category = req.body.category;
    item.price = req.body.price;
    await item.save();
    res.redirect("/items");
  } catch (err) {
    console.log(err);
    res.redirect("/items");
  }
}

// DELETE item
async function deleteItem(req, res) {
  try {
    // Delete item from the item database
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    // Go through all the lists and remove the item from the itemsList array
    const lists = await List.find({ "itemsList.item": deletedItem._id });
    await Promise.all(
      lists.map(async (list) => {
        list.itemsList = list.itemsList.filter(
          (item) => !item.item.equals(deletedItem._id)
        );
        await list.save();
      })
    );

    res.redirect("/items");
  } catch (err) {
    console.log(err);
    res.redirect("/items");
  }
}

