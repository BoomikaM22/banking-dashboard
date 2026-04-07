import User from "../models/User.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    const { password: _, ...safe } = user.toObject();
    res.json({ user: safe, token: `mock-token-${user.id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const user = new User({
      id: require("uuid").v4(),
      name,
      email,
      password
    });
    await user.save();

    const { password: _, ...safe } = user.toObject();
    res.status(201).json({ user: safe, token: `mock-token-${user.id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
