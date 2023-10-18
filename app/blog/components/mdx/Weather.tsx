"use client";
import { useState } from "react";

const Weather = () => {
  // change theme if I tap on the weather card
  const [weatherTheme, setTheme] = useState("dark");
  const changeTheme = () => {
    if (weatherTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <>
      <div
        onClick={changeTheme}
        className={`mt-8 flex flex-col justify-between rounded-3xl p-4 md:p-10 bg-gradient-to-b text-white cursor-pointer

      transform transition-transform duration-300 ease-in-out active:scale-105 focus:scale-105 hover:scale-105 select-none
    ${
      weatherTheme === "dark"
        ? "from-gray-900 to-gray-600"
        : "from-blue-600 to-sky-400"
    }
    `}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="m-0">Houston</p>
            <p className="text-5xl m-0">71°</p>
          </div>
          <div className="text-right text-sm md:text-base">
            <svg
              xmlns="http://www.w3 .org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-auto"
            >
              <path d="M1 12.5A4.5 4.5 0 005.5 17H15a4 4 0 001.866-7.539 3.504 3.504 0 00-4.504-4.272A4.5 4.5 0 004.06 8.235 4.502 4.502 0 001 12.5z" />
            </svg>
            <p className="m-0 mt-2 leading-tight font-medium">mostly cloudy</p>
            <p className="m-0 leading-tight font-medium">H:72° L:58°</p>
          </div>
        </div>
        <div className="flex justify-between w-full mt-2 md:mt-6">
          {[1, 2, 3, 4, 5, 6].map((number, i) => (
            <div key={i} className="flex flex-col gap-1 m-0 items-center">
              <p className="text-xs md:text-sm mb-0 opacity-75">{number}PM</p>
              {number < 4 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M1 12.5A4.5 4.5 0 005.5 17H15a4 4 0 001.866-7.539 3.504 3.504 0 00-4.504-4.272A4.5 4.5 0 004.06 8.235 4.502 4.502 0 001 12.5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-400"
                >
                  <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                </svg>
              )}
              <p className="text-sm md:text-base m-0 font-medium">67°</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 mb-8">
        <figcaption>Try tapping on me to switch theme.</figcaption>
      </div>
    </>
  );
};

export default Weather;
