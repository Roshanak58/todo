import User from "@/models/user";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB!" });
  }
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "Youn are not logged in!" });
  }
  console.log(" session.user.email::", session.user.email);
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User does not exist!" });
  }

  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const { name, lastName, password } = body;
    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return res
        .status(422)
        .json({ status: "failed", message: "Password is incorrect!" });
    }
    user.name = name;
    user.lastName = lastName;
    user.save();
    res.status(200).json({
      status: "success",
      data: { name, lastName, email: session.user.email },
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  } else if (req.method === "PATCH") {
    const body = JSON.parse(req.body);
    const { namee, lastNamee, password } = body;
    console.log("api", namee, lastNamee, password);
    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return res
        .status(422)
        .json({ status: "failed", message: "Password is incorrect!" });
    }
    // const result = await user.updateOne(
    //   { email: session.user.email },
    //   { $set: { name: namee, lastName: lastNamee } }
    // );
    // console.log("result:", result);
    // res.status(200).json({ status: "success", status: "success" });
    const result = await User.updateOne(
    { email: session.user.email },
    { $set: { name: namee, lastName: lastNamee } }
  );

  if (result.modifiedCount === 0) {
    return res.status(400).json({ status: "failed", message: "No changes applied" });
  }

  res.status(200).json({ status: "success", message: "User updated successfully" });
   
  }
}
export default handler;
