import { Outlet, useLocation } from "react-router-dom";
import Header, { TopHeader } from "../components/Header";
import NewsFeed from "../components/News";

export default function Home() {
  const route = useLocation().pathname.split("/").slice(1);

  return (
    <div className="relative min-h-screen sm:flex">
      <Header />
      <div className="w-full pt-8 sm:pt-0">
        <div className="px-8 py-6 border-b-2 mb-9 hidden sm:block">
          <p className="flex capitalize text-4xl font-extrabold items-center">
            {route[0]}
            {route[1] ? (
              <span className="text-lg text-gray-400">{` - (${route[1]})`}</span>
            ) : null}
          </p>
        </div>
        <Outlet />
      </div>
      <NewsFeed />
    </div>
  );
}
