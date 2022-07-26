import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
import { getProviders, getSession, useSession } from "next-auth/react";
// import styles from "../styles/Home.module.css";
// import styles from "../styles/globals.css";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { modalStatus } from "../store/StatusStore";
import Widgets from "../components/Widgets";
export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const isOpen = modalStatus((state) => state.modalState);

  if (!session) {
    return (
      <>
        <Login providers={providers}></Login>
      </>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        {/* SideBar */}
        <SideBar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
        <Widgets trendingResults={trendingResults} followResults={followResults} />

        {/* Modal */}
        {isOpen && <Modal />}
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then((res) => res.json());
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then((res) => res.json());

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
