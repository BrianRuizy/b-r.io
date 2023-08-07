import slugify from "slugify";
import Link from "./Link";

type TagsProps = {
  tags: string[];
};

const Tags = ({ tags }: TagsProps): JSX.Element | null => {
  if (!tags?.length) {
    return null;
  }
  return (
    <ul className="flex flex-col gap-6 animated-list">
      <h2>Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag: string) => (
          <li key={tag}>
            <Link
              href={`/blog/tag/${slugify(tag, { lower: true })}`}
              className="px-4 py-2 rounded-lg bg-secondary text-sm text-secondary whitespace-nowrap"
            >
              #{tag}
            </Link>
          </li>
        ))}
      </div>
    </ul>

  );
};

export default Tags;
