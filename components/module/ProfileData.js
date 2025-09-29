import Link from "next/link";
import { GrEdit } from "react-icons/gr";
function ProfileData({ data }) {
  return (
    <div className="profile-data">
      <div>
        <span>Name:</span>
        <p>{data.name}</p>
      </div>
      <div>
        <span>Last Name:</span>
        <p>{data.lastName}</p>
      </div>
      <div>
        <span>Email:</span>
        <p>{data.email}</p>
      </div>
         <Link
        href={{
          pathname: `/editProfile/${data.email}`,
          query: {
            email: `${data.email}`,
            name: `${data.name}`,
            lastName: `${data.lastName}`,
          },
        }} className="profile-data-link"
      >
        Edit  .
        <GrEdit />
      </Link>
    </div>
  );
}

export default ProfileData;
