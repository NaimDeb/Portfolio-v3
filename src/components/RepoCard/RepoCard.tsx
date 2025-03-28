import { useState, useRef } from "react";
import Icon from "../ui/Icon/Icon";
// import { log } from 'node_modules/astro/dist/core/logger/core';
import PreviewImage from "../ui/RepoCard/PreviewImage";

type RepoCardProps = {
  repo: string;
  link: string;
  website?: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
};

type MousePosition = {
  x: number;
  y: number;
};

export default function RepoCard({
  repo,
  link,
  website,
  description,
  language,
  languageColor,
  stars,
  forks,
}: RepoCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const getPreviewUrl = (githubUrl: string): string => {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return "/assets/defaultCardPreview.webp";
    const [, username, repoName] = match;

    // Using Statically CDN to proxy the image
    return `https://cdn.statically.io/gh/${username}/${repoName}/main/preview.gif`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const windowWidth = window.innerWidth;
    if (e.clientX + 400 > windowWidth) {
      setMousePos({
        x: e.clientX - 195,
        y: e.clientY - 190,
      });
    } else {
      setMousePos({
        x: e.clientX + 195,
        y: e.clientY - 190,
      });
    }
  };

  return (
    <div className="relative max-sm:w-full">
      <a
        ref={cardRef}
        className="block text-decoration-none max-sm:min-w-[90%] sm:w-[30rem] p-2 bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-gray-500 shadow-sm rounded-lg transition-all hover:shadow-md hover:border-accent-dark hover:brightness-110 hover:-translate-y-2"
        href={website ? website : link}
        aria-label={website ? "Visit website" : "View repo on GitHub"}
        title={website ? "Visit website" : "View repo on GitHub"}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Preview section - only visible on mobile */}
        <div className="hidden max-lg:block w-full h-48 relative">
          <PreviewImage link={link} repo={repo} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Card content */}
        <div className="p-4 md:p-5">
          <div className="flex items-center justify-between gap-3 repoCard">
            <h3 className="text-lg md:text-xl text-slate-200">{repo}</h3>
            <div className="transition-transform duration-200 hover:scale-125">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(link, "_blank");
                }}
                aria-label={`View ${repo} on GitHub`}
              >
                <Icon icon="github-logo" color="var(--gray-200)" size="2.5em" />
              </button>
            </div>
          </div>
          <p className="text-sm md:text-base my-3 text-gray-200 overflow-hidden line-clamp-3 md:min-h-[4.5rem] text-left">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                style={{ backgroundColor: languageColor }}
              ></span>
              <span className="text-sm md:text-base font-bold text-gray-200">
                {language}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {stars >= 0 && (
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
        </div>
      </a>

      {/* Hover preview - only visible on desktop */}
      <div
        className="fixed w-96 h-56 pointer-events-none rounded-lg overflow-hidden bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-50 transform -translate-x-1/2 -translate-y-1/2 border border-gray-500/30 max-sm:hidden"
        style={{
          opacity: isHovering ? 1 : 0,
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      >
        <PreviewImage link={link} repo={repo} />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3">
          <p className="text-white text-sm font-medium truncate">{repo}</p>
          <p className="text-gray-300 text-xs truncate">{description}</p>
        </div>
      </div>
    </div>
  );
}
