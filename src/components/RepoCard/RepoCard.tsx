import { useState, useRef, useEffect } from 'react';
import Icon from "../ui/Icon/Icon";
import { log } from 'node_modules/astro/dist/core/logger/core';

type RepoCardProps = {
  repo: string;
  link: string;
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
  description,
  language,
  languageColor,
  stars,
  forks,
}: RepoCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const getRawGitHubUrl = (githubUrl: string) => {
    // Extract username and repo name from GitHub URL
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;
    const [, username, repoName] = match;
    return `https://raw.githubusercontent.com/${username}/${repoName}/refs/heads/main/preview.gif`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = document.documentElement.getClientRects();
    if ((e.clientX + 400 )> rect[0].width) { 
    setMousePos({
      x: e.clientX - 195,
      y: e.clientY - 190
    });



  }
  else{
    setMousePos({
      x: e.clientX + 195,
      y: e.clientY - 190
    });

  }
  };

  return (
<div className="relative max-sm:w-full">
<a
  ref={cardRef}
  className="block text-decoration-none max-sm:min-w-[90%] sm:w-[30rem] p-4 md:p-5 lg:p-7 bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-gray-500 shadow-sm rounded-lg transition-all hover:shadow-md hover:border-accent-dark hover:brightness-110 hover:-translate-y-2"
  href={link}
  title="View repo"
  target="_blank"
  rel="noopener noreferrer"
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
  onMouseMove={handleMouseMove}
>
  <div className="flex items-center justify-between gap-3 repoCard">
    <h3 className="text-lg md:text-xl text-slate-200">{repo}</h3>
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
</a>


      <div
        className={`fixed w-96 h-56 pointer-events-none rounded-lg overflow-hidden bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-50 transform -translate-x-1/2 -translate-y-1/2 border border-gray-500/30 `}
        style={{
          opacity: isHovering ? 1 : 0,
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      >
        <img
        // Opération ternaire pour éviter erreur
          src={`${getRawGitHubUrl(link) ? getRawGitHubUrl(link) : null}` }
          alt={`${repo} preview`}
          className={`w-full h-full object-contain opacity-80 bg-top transition-transform !duration-[8s] ease-in-out
          }`}

          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=300&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3">
          <p className="text-white text-sm font-medium truncate">{repo}</p>
          <p className="text-gray-300 text-xs truncate">{description}</p>
        </div>
      </div>
    </div>
  );
}