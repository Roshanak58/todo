import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { sortTodos } from "@/utils/sortTodos";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB!" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User desn't exist!" });
  }
  if (req.method === "POST") {
    // const body = JSON.parse(req.body);
    const {id,title,caption, status } = req.body;
    console.log("REQUEST::",id,caption,title,status)
    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });
    }
    user.todos.push({ title,caption, status });
    user.save();
    return res
      .status(201)
      .json({ status: "success", message: "Todo created." });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    // const body = JSON.parse(req.body);
    const { id, status } = req.body;
    if (!status || !id) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }
    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    console.log("result:", result);
    res.status(200).json({ status: "success" });
  }
}
export default handler;
