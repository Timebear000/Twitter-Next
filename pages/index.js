import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
// import styles from "../styles/Home.module.css";
// import styles from "../styles/globals.css";
export default function Home() {
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
        {/* Modal */}
      </main>
    </div>
  );
}
