import Link from "next/link";

import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

function Layout({ children }) {
  const { status } = useSession();
  const logOutHandler = () => {
    signOut();
  };
  return (
    <div className="container">
      <header>
        <p>Botostart Todo App</p>
        {status === "authenticated" ? (
          <button onClick={logOutHandler}>
            Logout
            <FiLogOut />
          </button>
        ) : null}
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome 👋🏻</p>
          <ul>
            <li>
              <VscListSelection />
              <Link href="/">Todo</Link>
            </li>
          </ul>
          <ul>
            <li>
              <BiMessageSquareAdd />
              <Link href="/add-todo">Add Todo</Link>
            </li>
          </ul>
          <ul>
            <li>
              <RxDashboard />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
      <footer>
        <p>🌺🌺Developed by Roshanak.A🌺🌺</p>
      </footer>
    </div>
  );
}

export default Layout;
