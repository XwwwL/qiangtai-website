"use client";

import { Package, FileText } from "lucide-react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/hooks/useLocale";

interface EmptyCategoryStateProps {
  categoryName: string;
}

export function EmptyCategoryState({ categoryName }: EmptyCategoryStateProps) {
  const locale = useLocale();
  const dict = useDictionary();

  return (
    <div className="bg-gradient-to-br from-navy-800 via-industrial-600 to-teal-600 rounded-2xl p-10 md:p-16 text-center">
      <div className="max-w-lg mx-auto">
        <Package size={56} className="mx-auto text-white/40 mb-5" />
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          {dict.emptyCategory.title}
        </h3>
        <div className="flex items-center justify-center gap-2 text-white/70 mb-4">
          <FileText size={18} />
          <p className="text-base">
            {dict.emptyCategory.subtitle}
            <br />
            {dict.emptyCategory.contactForCatalog}
          </p>
        </div>
        <p className="text-white/50 text-sm mb-6">
          {locale === "zh"
            ? `${categoryName} 系列可提供询价。欢迎联系我们获取详细规格、材质选项与报价。`
            : locale === "ru"
            ? `Серия ${categoryName} доступна для запроса. Мы можем предоставить подробные спецификации, варианты материалов и цены по запросу.`
            : `Our ${categoryName} range is available for inquiry. We can provide detailed specifications, material options, and pricing upon request.`}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg border border-white/20 transition-colors"
        >
          {dict.emptyCategory.requestInfo}
        </Link>
      </div>
    </div>
  );
}
