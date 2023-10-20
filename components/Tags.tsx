import slugify from "slugify";
import Link from "./ui/Link";

type TagsProps = {
  tags: string[];
};

const Tags = ({ tags }: TagsProps): JSX.Element | null => {
  if (!tags?.length) {
    return null;
  }
  return (
    <ul className="flex flex-col gap-6">
      <h2>Tags</h2>
      <div className="flex flex-wrap gap-3 animated-list">
        {tags.map((tag: string) => (
          <li key={tag} className="transition-opacity">
            <Link
              href={`/blog/tag/${slugify(tag, { lower: true })}`}
              className="px-4 py-2 rounded-lg bg-secondary text-sm text-primary whitespace-nowrap "
            >
              {tag}
            </Link>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default Tags;
