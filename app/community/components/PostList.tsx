
import PostComponent from "@/app/community/components/PostComponent";
import { Post } from "@/app/community/components/PostComponent";

export default function PostList() {

  return (
    <div className="flex flex-col divide-y divide-secondary">
      {postData.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}