type SpinnerProps = {
    size?: string; // Dynamique pour la taille du loader
    color?: string; // Dynamique pour la couleur
  };
  
  export default function Spinner({
    size = "40px",
    color = "var(--accent-regular)",
  }: SpinnerProps) {
    return (
      <div className="flex justify-center items-center" style={{ height: size }}>
        <div
          className={`rounded-full border-4 border-gray-200 border-t-4 animate-spin`}
          style={{
            borderTopColor: color, // Couleur dynamique
            width: size, // Taille dynamique
            height: size,
          }}
        ></div>
      </div>
    );
  }
  