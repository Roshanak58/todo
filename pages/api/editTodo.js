import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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
  if (req.method === "PATCH") {
    const body = JSON.parse(req.body);
    const { Id, title, caption, status } = body;
    console.log("EditTodo::",Id,title,caption,status)
    if (!status || !Id ) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }
    const result = await User.updateOne(
      { "todos._id": Id },
      { $set: { "todos.$.title": title,"todos.$.caption": caption,"todos.$.status": status } }
    );
    console.log("result:", result);
    res.status(200).json({ status: "success" });
  }else if (req.method === "GET"){
    res
      .status(200)
      .json({
        status: "success",
        data: { name: user.name, lastName: user.lastName, email: user.email },
      });

  }
}
export default handler;
