import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BASE_URL, calculateAge } from "../utils";

export default function view() {
  const { push } = useRouter();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(`${BASE_URL}/user`);
        const res = await result.json();
        console.log(res?.success);
        setUserData(res?.success?.data?.results);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {};
  }, []);

  return (
    <div className="py-4 px-6 w-full mb-4">
      <div className="flex items-center justify-start">
        <button
          onClick={() => {
            push("/");
          }}
          className="hover:ring-2 hover:ring-theme hover:ring-offset-2 flex items-center justify-center capitalize gap-4 px-4 py-2 font-medium tracking-wide w-32 sm:w-28 text-base btn-class rounded-md shadow-xl bg-theme text-white"
        >
          Register
        </button>
      </div>
      {/*  */}
      <div className="grid lg:grid-cols-5 md:grid-cols-3  grid-cols-1 gap-4 mt-4">
        {userData?.map((item: any) => {
          return (
            <div className="max-h-[340px] min-h-[280px] bg-blue-700/30 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg max-w-sm min-w-full mx-auto">
              <h2 className="text-xl font-bold text-black">
                {item?.firstName} {item?.lastName}
              </h2>
              <p className="text-black mt-4">
                {item?.country}, {item?.state}, {item?.city}
              </p>
              <p className="text-black mt-4">
                {calculateAge(item?.dateOfBirth)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
