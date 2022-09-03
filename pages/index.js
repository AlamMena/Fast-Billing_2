import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="px-10 max-w-2xl mx-8 md:mx-0 space-x-4 bg-green-200 flex md:flex-nowrap justify-center flex-wrap items-center p-8 rounded-2xl">
        <div className="flex flex-col ">
          <span className="font-semibold text-2xl tracking-wider">
            Welcome back Alam
          </span>
          <p className="text-xs mt-4">
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there is not anything
          </p>
          <div className="flex w-full justify-center md:justify-start my-4">
            <button className=" my-4 shadow-sm w-24 bg-green-500 py-2 px-4 text-xs rounded-xl text-white">
              Go now
            </button>
          </div>
        </div>
        <div className="flex">
          <img
            alt="welcome image"
            className="md:w-72 h-full w-64"
            src="/dashboard_welcome.png"
          />
        </div>

        {/* <video
          loop
          autoPlay="autoplay"
          muted
          className="rounded-xl w-40 h-full"
        >
          <source
            src="https://cdn.dribbble.com/users/2163229/screenshots/16754256/media/2d429d853bcfb01a12657c471db0595f.mp4"
            type="video/mp4"
          />
          <source
            src="https://cdn.dribbble.com/users/2163229/screenshots/16754256/media/2d429d853bcfb01a12657c471db0595f.mp4"
            type="video/ogg"
          />
          Your browser does not support HTML video.
        </video> */}
      </div>
    </>
  );
}
