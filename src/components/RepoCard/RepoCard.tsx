import Icon from "../ui/Icon/Icon";
import "./RepoCard.styles.scss";

type RepoCardProps = {
  repo: string;
  link: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
};

export default function RepoCard({
  repo,
  link,
  description,
  language,
  languageColor,
  stars,
  forks,
}: RepoCardProps) {
  return (
<a
  className="block text-decoration-none p-4 md:p-5 lg:p-7 bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-accent-regular shadow-sm rounded-lg transition-all hover:shadow-md hover:border-accent-dark hover:brightness-110 hover:-translate-y-2"
  href={link}
  title="View repo"
  target="_blank"
  rel="noopener noreferrer"
>
  <div className="flex items-center justify-between gap-3">
    <h3 className="text-lg md:text-xl">{repo}</h3>
    <Icon icon="github-logo" color="var(--gray-200)" size="2.5em" />
  </div>
  <p className="text-sm md:text-base my-3 text-gray-200 overflow-hidden line-clamp-3 md:min-h-[4.5rem]">
    {description}
  </p>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span
        className="w-4 h-4 md:w-5 md:h-5 rounded-full"
        style={{ backgroundColor: languageColor }}
      ></span>
      <span className="text-sm md:text-base font-bold text-gray-200">{language}</span>
    </div>
    <div className="flex items-center gap-3">
      {stars > 0 && (
        <span className="flex items-center gap-1 text-gray-200 text-sm md:text-base">
          <Icon icon="star" color="var(--gray-200)" size="1.25em" />
          <span>{stars}</span>
        </span>
      )}
      {forks > 0 && (
        <span className="flex items-center gap-1 text-gray-200 text-sm md:text-base">
          <Icon icon="git-fork" color="var(--gray-200)" size="1.25em" />
          <span>{forks}</span>
        </span>
      )}
    </div>
  </div>
</a>
  );
}
