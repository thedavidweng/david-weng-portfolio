type PortfolioImageProps = {
  alt: string;
  className?: string;
  fill?: boolean;
  height?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
  sizes?: string;
  src: string;
  width?: number;
};

export function PortfolioImage({
  alt,
  className,
  fill,
  height,
  loading,
  priority,
  sizes,
  src,
  width
}: PortfolioImageProps) {
  const resolvedLoading = priority ? "eager" : (loading ?? "lazy");

  if (fill) {
    return (
      <img
        alt={alt}
        className={className}
        decoding="async"
        loading={resolvedLoading}
        sizes={sizes}
        src={src}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      height={height}
      loading={resolvedLoading}
      sizes={sizes}
      src={src}
      width={width}
    />
  );
}