const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, // no duplicates
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
    photo: {
      type: String,
      default: "https://via.placeholder.com/128",
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

// remove password field when sending user object to client
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password; // Remove the password field
    return ret;
  },
});
userSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// hash the password before saving the user (dont want to save plaintext password)
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next(); // Skip if the password is unchanged (e.g password reset and first save)
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash; // Replace plaintext password with hash
    next();
  });
});

// compare the password entered by the user with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    // Compare the entered password with the stored hash
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (err) {
    throw new Error("Password comparison failed: ", err);
  }
};

module.exports = mongoose.model("User", UserSchema);