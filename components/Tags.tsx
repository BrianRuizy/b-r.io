type TagsProps = {
  tags: string[] | undefined;
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
            {tag}
          </li>
        ))}
      </div>
    </ul>

  );
};

export default Tags;
