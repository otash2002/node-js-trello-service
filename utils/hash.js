import bcrypt from "bcrypt";

// Parolni hashlash funksiyasi
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Parolni solishtirish funksiyasi (login paytida ishlatiladi)
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
