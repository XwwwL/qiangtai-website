import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-page-bg">
      <div className="text-center px-4">
        <p className="text-8xl font-extrabold gradient-text mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">Page Not Found / 页面未找到</h1>
        <p className="text-text-muted max-w-md mx-auto mb-8">The page you are looking for does not exist or has been moved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/en" className="inline-flex items-center gap-2 px-5 py-2.5 bg-tech-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"><Home size={16} />Back to Home</Link>
          <Link href="/en/products" className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:border-tech-500 text-navy-900 hover:text-tech-500 font-semibold rounded-lg transition-colors"><ArrowLeft size={16} />View Products</Link>
        </div>
      </div>
    </div>
  );
}
