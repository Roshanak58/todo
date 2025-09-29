import User from "@/models/user";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

async function handler(req, res) {
  if (req.method !== "POST") return;
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting DB!" });
  }
  const body = req.body;
  const { email, password } = body;
  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data!" });
  }
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "User already exist!" });
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ email: email, password: hashedPassword });
  console.log(newUser);
  return res
    .status(201)
    .json({ status: "succes", message: "User was created." });
}
export default handler;
