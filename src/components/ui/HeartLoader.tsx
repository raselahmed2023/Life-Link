import { Heart } from "lucide-react";

type HeartLoaderProps = {
  text?: string;
  size?: number;
};

export default function HeartLoader({
  text,
  size = 22,
}: HeartLoaderProps) {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      <span className="relative flex items-center justify-center">
        <Heart
          size={size}
          fill="currentColor"
          className="animate-heartbeat text-current"
        />
      </span>

      {text && <span>{text}</span>}
    </span>
  );
}