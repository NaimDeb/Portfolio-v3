export default function PreviewImage({ link, repo }: { link: string; repo: string }) {
    const getPreviewUrl = (githubUrl: string): string => {
      const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!match) return "/assets/defaultCardPreview.webp";
      const [, username, repoName] = match;
      return `https://cdn.statically.io/gh/${username}/${repoName}/main/preview.gif`;
    };
  
    return (
      <img
        src={getPreviewUrl(link)}
        alt={`${repo} preview`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.src = "/assets/defaultCardPreview.webp";
          img.onerror = null;
        }}
      />
    );
  };
