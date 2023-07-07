import loader from "../assets/dogo.png";
import loader2 from "../assets/loader2.gif";

export default function Loader() {
  return (
    <div className="bg-twitter h-screen w-screen flex flex-col justify-center items-center">
      <img
        className="h-32 w-32 rounded-full loader object-cover"
        src={loader}
        alt="loading..."
      />
    </div>
  );
}
export function Loading() {
  return (
    <div className=" flex flex-col w-full justify-center items-center">
      <img className="h-10 w-10 my-3 rounded-full " src={loader2} alt="loading..." />
    </div>
  );
}
