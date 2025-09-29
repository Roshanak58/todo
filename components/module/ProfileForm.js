import { GrEdit } from "react-icons/gr";
function ProfileForm({
  editProf,
  name,
  lastName,
  password,
  setName,
  setLastName,
  setPassword,
  EditHandler,
  submitHandler,
}) {
  return (
    <>
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {editProf === "edit" ? (
        <button onClick={EditHandler}>
          Edit .<GrEdit />
        </button>
      ) : editProf === "Submit" ? (
        <button onClick={submitHandler}>Submit</button>
      ) : null}
    </>
  );
}

export default ProfileForm;
