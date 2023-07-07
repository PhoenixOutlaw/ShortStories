import React from "react";

export default function NewsFeed() {
  return (
    <div className="sticky top-0 w-2/6 h-screen border-l-2 py-4 hidden lg:flex flex-col">
      <p className="capitalize text-2xl font-bold text-center py-5 border-b-2 mb-5">
        news
      </p>
      <div className="px-5">
        <News />
        <News />
        <News />
      </div>
    </div>
  );
}

function News() {
  return (
    <div className=" bg-twitter mb-5 px-7 py-3 rounded-md text-white">
      <p className="text-center text-xl font-semibold capitalize mb-2">
        heading
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, nihil
        veniam? Libero,
      </p>
    </div>
  );
}
