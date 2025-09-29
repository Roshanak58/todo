import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import Link from "next/link";
function Tasks({ data, next, back, fetchTodos }) {
  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") fetchTodos();
  };
  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="tasks__card">
          <span className={i.status}></span>
          <Link href={{
            pathname: `/details/${i._id}`,
            query: { id:`${i._id}`, title:`${i.title}`,caption:`${i.caption}`,status:`${i.status}`, },
          }}>
        <RiMastodonLine />

          <h4>{i.title}</h4>
      </Link>
          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => changeStatus(i._id, back)}
              >
                <BiLeftArrow />
                back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => changeStatus(i._id, next)}
              >
                next
                <BiRightArrow />
              </button>
            ) : null}
           
            <Link href={{
        pathname: `/edit/${i._id}`,
        query: { id:`${i._id}`, title:`${i.title}`,caption:`${i.caption}`,status:`${i.status}`, },
      }}>
              <GrEdit />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
