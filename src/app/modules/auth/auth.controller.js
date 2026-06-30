import jwt from "jsonwebtoken";

export const googleBetterAuthBridge = async (req, res) => {
  try {
    const { email, name, photo } = req.body;
    
    
    const db = req.db || req.app.locals.db; 
    const usersCollection = db.collection("users"); 

    let user = await usersCollection.findOne({ email });

    
    if (!user) {
      const newUser = {
        name,
        email,
        role: "reader", 
        photo: photo || null,
        createdAt: new Date()
      };
      const result = await usersCollection.insertOne(newUser);
      user = { _id: result.insertedId, ...newUser };
    }

   
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Google BetterAuth sync successful",
      accessToken: token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, photo: user.photo }
    });
  } catch (error) {
    res.status(500).json({ message: "JWT bridging error", error: error.message });
  }
};