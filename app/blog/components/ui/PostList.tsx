"use client";

import type { Post as PostType } from ".contentlayer/generated";
import Post from "./Post";
import React, { useRef, useState } from "react";

import { useLang } from "@/components/LanguageProvider";

function getRelativeCoordinates(
  event: React.MouseEvent<HTMLUListElement>,
  referenceElement: any
) {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.clientTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight,
  };

  let reference = referenceElement.offsetParent;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
  };
}

type PostListProps = {
  posts: PostType[];
};

export default function PostList({ posts }: PostListProps) {
  const { lang } = useLang();
  const [mousePosition, setMousePosition] = useState({
    x: 240,
    y: 0,
  });
  const listRef = useRef(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    setMousePosition(getRelativeCoordinates(e, listRef.current));
  };

  return (
    <ul
      ref={listRef}
      onMouseMove={(e) => handleMouseMove(e)}
      className="flex flex-col animated-list"
    >
      {posts.length === 0 && <p>Aucune publication trouvée</p>}
      {posts.map((post) => (
        <Post key={post.slug} post={post} mousePosition={mousePosition} lang={lang} />
      ))}
    </ul>
  );
}
