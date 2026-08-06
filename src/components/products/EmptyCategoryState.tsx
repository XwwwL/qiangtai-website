import { Package, FileText } from "lucide-react";
import Link from "next/link";

interface EmptyCategoryStateProps {
  categoryName: string;
}

export function EmptyCategoryState({ categoryName }: EmptyCategoryStateProps) {
  return (
    <div className="bg-gradient-to-br from-navy-800 via-industrial-600 to-teal-600 rounded-2xl p-10 md:p-16 text-center">
      <div className="max-w-lg mx-auto">
        <Package size={56} className="mx-auto text-white/40 mb-5" />
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          Product Catalog Being Updated
        </h3>
        <div className="flex items-center justify-center gap-2 text-white/70 mb-4">
          <FileText size={18} />
          <p className="text-base">
            Product images and specifications are being updated.
            <br />
            Please contact us for the latest catalog.
          </p>
        </div>
        <p className="text-white/50 text-sm mb-6">
          Our {categoryName} range is available for inquiry. We can provide detailed
          specifications, material options, and pricing upon request.
        </p>
        <Link
          href="/en/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg border border-white/20 transition-colors"
        >
          Request Product Information
        </Link>
      </div>
    </div>
  );
}
