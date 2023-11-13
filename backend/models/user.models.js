import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email",
        ],
      },
      password: {
        type: String,
        required: [true, " Password is required"],
      },
      photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },
      phone: {
        type: String,
        default: "+880",
      },
      bio: {
        type: String,
        default: "bio",
      },
      role: {
        type: String,
        required: true,
        default: "admin",
        // subscriber, author, and admin (suspended)
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      userAgent: {
        type: Array,
        required: true,
        default: [],
      },
    },
    {
      timestamps: true,
      minimize: false,
    }
  );

  // Encrypt password before saving to DB
//userSchema.pre("save", async function (next) {...}: This line sets up a pre-save hook on the userSchema.
userSchema.pre("save", async function (next) {
    //if (!this.isModified("password")) {...}: This line checks if the password field of the document has been modified. If it hasn't, the function calls next() and ends, allowing Mongoose to continue the save operation.
    if (!this.isModified("password")) {
      return next();
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  });

  const User = mongoose.model("User", userSchema);
  export default User;