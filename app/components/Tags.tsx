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
        <li
          key={tag}
          className="whitespace-nowrap rounded-lg bg-secondary px-4 py-1.5 text-sm text-secondary transition-opacity"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
