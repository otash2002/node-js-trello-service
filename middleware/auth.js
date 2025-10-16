    // middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token topilmadi" });
    }

    // Bearer <token>
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token notogri" });
    }

    // Tokenni tekshirish
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Foydalanuvchi ma’lumotini requestga qo‘yamiz
    next();
  } catch (err) {
    console.error("Auth middleware xatolik:", err);
    res.status(401).json({ message: "Token tekshirishda xatolik" });
  }
};

export default authMiddleware;

