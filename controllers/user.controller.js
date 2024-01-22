const bcrypt = require("bcryptjs")
const User = require('../models/user.model');


//Reegister APi logic
module.exports.registerUser = async (req, res) => {
  try {
    const {username,email,password,firstName,lastName,contactNumber,userType} = req.body;

    if (!email || !contactNumber || !userType) {
      return res.status(400).json({ message: 'Please provide email, contact number, and userType' });
    }

    if (userType === 'Seller' && !email.endsWith('@admin.com')) {
      return res.status(400).json({ message: 'Sellers can only register with an admin domain email address' });
    }

    const hashedPassword =await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      contactNumber,
      userType,
    });

    await newUser.save();

    res.status(200).json({
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: '*', // Do not send the hashed password to the client
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      contactNumber: newUser.contactNumber,
      userType: newUser.userType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//Log in api Logic

module.exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password' });
      }
  
      const user = await User.findOne({ username });

      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!user || !isMatch) {
        return res.status(400).json({ message: 'Invalid Login Credentials' });
      }
  
      res.status(200).json({ userId: user._id, message: 'Login Successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};


//View User Details

module.exports.viewUserDetails = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    res.status(200).json({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      userType: user.userType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





//Updating User Details
module.exports.updateUserDetails = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, contactNumber, userType } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.contactNumber = contactNumber;
    user.userType = userType;

    await user.save();

    res.status(200).json({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      userType: user.userType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};