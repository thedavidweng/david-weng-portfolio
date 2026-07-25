import { buildSrcset } from "@/lib/responsive-srcset";

type PortfolioImageProps = {
  alt: string;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
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
  fetchPriority,
  fill,
  height,
  loading,
  priority,
  sizes,
  src,
  width
}: PortfolioImageProps) {
  const resolvedLoading = priority ? "eager" : (loading ?? "lazy");
  const srcset = buildSrcset(src, width);

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      fetchPriority={fetchPriority}
      loading={resolvedLoading}
      sizes={sizes}
      src={src}
      srcSet={srcset}
      {...(fill
        ? { style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }
        : { width, height })}
    />
  );
}
