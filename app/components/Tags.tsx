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
    <ul className="animated-list flex flex-wrap gap-3 gap-y-6">
      {tags.map((tag: string) => (
        <li key={tag} className="transition-opacity">
          <Link
            href={`/blog/tag/${slugify(tag, { lower: true })}`}
            className="whitespace-nowrap rounded-lg bg-tertiary px-4 py-1.5 text-sm text-primary"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tags;
