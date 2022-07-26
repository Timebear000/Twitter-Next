import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";
const Login = ({ providers }) => {
  return (
    <>
      <Head>
        <title>{`TimeBear000 on Twitter  Dev`}</title>
        <meta name="description" content="NextJS Clone Twitter" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={`TimeBear on Twitter`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://lh3.googleusercontent.com/ogw/AOh-ky3d-9o_JghlbQrOHvnowVRBqHnejauUqCId9qkq=s64-c-mo"
        />
        <meta property="og:article:author" content="김요환" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center space-y-20 pt-48">
        <Image src="https://rb.gy/ogau5a" width={150} height={150} objectFit="contain" />
        <div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {/* https://devdojo.com/tailwindcss/buttons#_ */}
              <button
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                <span className="btn"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                  Sign in with {provider.name}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Login;
