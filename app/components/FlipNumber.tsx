"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import useIsMount from "@/app/_hooks/useismount";

type FlipNumberProps = {
  children: number;
};

function FlipNumber({ children }: FlipNumberProps) {
  const isMount = useIsMount();
  const [keyframe, setKeyframe] = useState<"initial" | "moveDown" | "out">(
    "initial",
  );
  const [numberToShow, setNumberToShow] = useState(children);
  const duration = 75;

  useEffect(() => {
    if (!isMount) {
      setTimeout(() => setKeyframe("out"), 0);
      setTimeout(() => setNumberToShow(children), duration);
      setTimeout(() => setKeyframe("moveDown"), duration);
      setTimeout(() => setKeyframe("initial"), duration * 2);
    }
  }, [children, isMount, duration]);

  return (
    <span
      className={clsx(
        "inline-flex",
        keyframe === "out" &&
          "-translate-y-3 opacity-0 duration-75 ease-in-out",
        keyframe === "initial" &&
          "translate-y-0 opacity-100 duration-75 ease-in-out",
        keyframe === "moveDown" && "translate-y-3 opacity-0",
      )}
    >
      {numberToShow?.toLocaleString()}
    </span>
  );
}

export default FlipNumber;
