import { collection, doc, onSnapshot, orderBy, query, getDoc } from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import SideBar from "../components/SideBar";
// import Widgets from "../components/Widgets";
import Comment from "../components/Comment";

import Post from "../components/Post";
import { db } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Head from "next/head";
import { modalStatus } from "../store/StatusStore";
import Widgets from "../components/Widgets";
function PostPage({ trendingResults, followResults, providers, initPost }) {
  const { data: session } = useSession();
  const isOpen = modalStatus((state) => state.modalState);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  // 해당 게시글 가져오기 DB 변경될떄 마다
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  // 해당 게시글의 댓글 리스트 가져오기
  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), (snapshot) =>
        setComments(snapshot.docs)
      ),
    [db, id]
  );
  // * 로그인 유도
  if (!session) return <Login providers={providers} />;

  return (
    <div>
      {/* 헤더 설정 */}
      <Head>
        <title>{`${initPost?.username} on Twitter: ${initPost?.text}`}</title>
        <meta name="description" content={initPost?.text} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={`${initPost?.username} on Twitter`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={initPost?.image} />
        <meta property="og:article:author" content={session.user.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <SideBar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>

          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment key={comment.id} id={comment.id} comment={comment.data()} />
              ))}
            </div>
          )}
        </div>
        <Widgets trendingResults={trendingResults} followResults={followResults} />

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then((res) => res.json());
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then((res) => res.json());
  const providers = await getProviders();
  const session = await getSession(context);
  const id = context.params.id;
  const docRef = doc(db, "posts", id);
  const initPost = await (await getDoc(docRef)).data();
  // (doc(db, "posts", id), (snapshot) => {
  //   initPost = snapshot.data();
  //   console.log(initPost);
  // });
  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
      initPost: { ...initPost, timestamp: {} },
    },
  };
}
