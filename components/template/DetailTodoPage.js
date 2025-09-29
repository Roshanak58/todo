import Link from "next/link";
import { GrEdit } from "react-icons/gr";
function DetailTodoPage(id) {
 
  return (
    <div className="profile-data">
      <div>
        <span>Title:</span>
        <p>{id.title}</p>
      </div>
      <div>
        <span>Caption:</span>
        <p>{id.caption}</p>
      </div>
      <div>
        <span>Status:</span>
        <p>{id.status}</p>
      </div>
      
        <Link
        href={{
          pathname: `/edit/${id.id}`,
          query: {
            id: `${id.id}`,
            title: `${id.title}`,
            caption: `${id.caption}`,
            status: `${id.status}`,
          },
        }} className="profile-data-link"
      >
        Edit  .
        <GrEdit />
      </Link>
      
    </div>
  );
}

export default DetailTodoPage;
