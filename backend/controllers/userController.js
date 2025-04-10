import UserModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const createToken = (id)=>{
    return jwt.sign({ id}, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.json({
      success: false,
      msg: "Please provide name, email, and password",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, msg: "User already exists" });
    }

    //validating data
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        msg: "Please enter a valid email",
      });
    }
     if (password.length < 6) {
       return res.json({
         success: false,
         msg: "Please password should exceed 6 characters",
       });
     }
    // Hash password and save user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new UserModel({ name, email, password: hashedPassword });

    const user = await newUser.save();

    // Generate token and set cookie
    const token = createToken(user._id)

    // Set cookie with token
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    // Send welcome email
    // const mailOptions = {
    //   from: process.env.SENDER_EMAIL,
    //   to: email,
    //   subject: "Welcome to Our Platform!",
    //   html: `
    //     <html>
    //       <body>
    //         <h2>Welcome to Our Platform!</h2>
    //         <p>Hello ${name},</p>
    //         <p>Your account has been created successfully with email: ${email}.</p>
    //       </body>
    //     </html>
    //   `,
    // };
    // await transporter.sendMail(mailOptions);

    return res.json({ success: true,token });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.json({ success: false, msg: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: "User does not exist" });
    }

    // Check password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, msg: "Wrong password" });
    }

    // Generate token and set cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Send login success email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "login successful",
      html: `
        <html>
          <body>
            <h2>you just logged in</h2>
            <p>Hello!</p>
            <p>Your have logged in successfully with email: ${email}.</p>
          </body>
        </html>
      `,
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

//admin login

export const adminLogin = async (req, res) => {};

// Logout user
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.json({ success: true, msg: "logout successful" });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};
