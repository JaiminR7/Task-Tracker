const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save hook to hash password before writing to the database
userSchema.pre('save', async function () {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return;

  // Hash the password with a cost factor of 12
  this.password = await bcrypt.hash(this.password, 12);
});

// Instance method to check if candidate password matches stored hash
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
