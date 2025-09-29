import HomePage from "@/components/template/HomePage";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  // const session = await getSession({req});
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
