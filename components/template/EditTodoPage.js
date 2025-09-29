import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RadioButton from "../element/RadioButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function EditTodoPage(id) {
  const router=useRouter()
  const [title, setTitle] = useState(id.title);
  const [caption, setCaption] = useState(id.caption);
  const [status, setStatus] = useState(id.status);
  const editHandler = async () => {
    const Id=id.id
    const res = await fetch("/api/editTodo", {
      method: "PATCH",
      body: JSON.stringify({ Id,title, caption, status }),
      headers: { "Content-Type": "applicatin/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success("Todo edited!");
       router.push("/")
    }
  };
  return (
    <div className="add-form">
      <h2>
        <GrEdit />
        Edit Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--first">
          <label htmlFor="caption">Caption:</label>
          <input
            id="caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="todo"
            title="Todo"
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="inProgress"
            title="In Progress"
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="review"
            title="Review"
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="done"
            title="Done"
          >
            <MdDoneAll />
          </RadioButton>
        </div>

        <button onClick={editHandler}>Edit</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditTodoPage;
