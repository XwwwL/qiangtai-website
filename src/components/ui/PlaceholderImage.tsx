import { Package } from "lucide-react";

interface PlaceholderImageProps {
  className?: string;
  label?: string;
}

export function PlaceholderImage({ className = "", label }: PlaceholderImageProps) {
  return (
    <div
      className={`bg-gradient-to-br from-navy-800 via-industrial-600 to-teal-600 flex flex-col items-center justify-center gap-3 text-white ${className}`}
    >
      <Package size={48} className="text-white/50" />
      {label ? (
        <p className="text-sm text-white/70 text-center px-4">{label}</p>
      ) : (
        <p className="text-sm text-white/70 text-center px-4">
          Product images and specifications are being updated.
          <br />
          Please contact us for the latest catalog.
        </p>
      )}
    </div>
  );
}
