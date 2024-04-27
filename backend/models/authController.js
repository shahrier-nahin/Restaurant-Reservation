import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
import validator from "validator";


const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Username must be a valid email address'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long."]
  },
});

// Hash password before saving
authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const Authentication = mongoose.model("Authentication", authSchema);



// Register user (POST /signup)
authSchema.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await Authentication.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists. Please choose a different username.');
    }

    // Create a new user
    const newUser = new Authentication({ username, password });
    await newUser.save();

    console.log('User created successfully:', newUser);
    res.send('User registration successful!');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error registering user!');
  }
});

// Login user (POST /login)
authSchema.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await Authentication.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password'); // Use 401 for unauthorized
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid username or password');
    }

    // Login successful (maybe replace with session management or JWT token generation in future)
    console.log('User logged in successfully:', user.username);
    res.send('Login successful!'); 
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in!');
  }
});


