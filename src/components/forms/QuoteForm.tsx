"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactDict = Dictionary["contactForm"];

const categoryKeys = [
  "threadedPipeFittings", "threadedPipes", "highPressureFittings",
  "camlockCouplings", "threadedValves", "forgedSteelBallValves",
  "flangedMultiWayBallValves", "hardSoftSealBallValves",
  "electricBallValves", "pneumaticBallValves", "other",
] as const;

const materialKeys = ["SS304", "SS316", "SS316L", "CS", "GS", "AL", "BR", "Other"] as const;

interface QuoteFormData {
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  productCategory: string;
  productName: string;
  quantity: string;
  material: string;
  size: string;
  message: string;
  privacyAgreed: boolean;
}

interface QuoteFormErrors {
  fullName?: string;
  email?: string;
  message?: string;
  privacyAgreed?: string;
}

interface QuoteFormProps {
  locale: Locale;
  dictionary: ContactDict;
}

const emptyForm: QuoteFormData = {
  fullName: "", companyName: "", country: "", email: "", phone: "",
  productCategory: "", productName: "", quantity: "", material: "", size: "",
  message: "", privacyAgreed: false,
};

export function QuoteForm({ locale, dictionary: t }: QuoteFormProps) {
  const [form, setForm] = useState<QuoteFormData>(emptyForm);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = (): boolean => {
    const e: QuoteFormErrors = {};
    if (!form.fullName.trim()) e.fullName = t.validation.fullNameRequired;
    if (!form.email.trim()) e.email = t.validation.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.validation.emailInvalid;
    if (!form.message.trim()) e.message = t.validation.messageRequired;
    if (!form.privacyAgreed) e.privacyAgreed = t.validation.privacyRequired;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        setStatus("success");
        setForm(emptyForm);
      } else {
        setStatus("error");
      }
    } catch {
      clearTimeout(timeout);
      setStatus("error");
    }
  };

  const update = (field: keyof QuoteFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof QuoteFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-tech-500 focus:ring-1 focus:ring-tech-500 outline-none transition-colors";
  const labelClass = "block text-sm font-medium text-navy-900 mb-1";

  if (status === "success") {
    return (
      <div className="text-center py-10 px-6" key={locale}>
        <CheckCircle size={56} className="mx-auto text-teal-600 mb-4" />
        <h3 className="text-xl font-bold text-navy-900 mb-2">{t.successTitle}</h3>
        <p className="text-text-muted mb-4">{t.successMessage}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-tech-500 hover:text-teal-600 transition-colors"
        >
          {t.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate key={locale}>
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle size={16} />
          {t.errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.fields.fullName.label} <span className="text-red-500">*</span></label>
          <input type="text" className={inputClass} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder={t.fields.fullName.placeholder} />
          {errors.fullName && <p className="text-xs text-red-600 mt-1" role="alert">{errors.fullName}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.fields.companyName.label} <span className="text-text-muted text-xs">({t.optional})</span></label>
          <input type="text" className={inputClass} value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder={t.fields.companyName.placeholder} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.fields.country.label} <span className="text-text-muted text-xs">({t.optional})</span></label>
          <input type="text" className={inputClass} value={form.country} onChange={(e) => update("country", e.target.value)} placeholder={t.fields.country.placeholder} />
        </div>
        <div>
          <label className={labelClass}>{t.fields.email.label} <span className="text-red-500">*</span></label>
          <input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder={t.fields.email.placeholder} />
          {errors.email && <p className="text-xs text-red-600 mt-1" role="alert">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.fields.phone.label} <span className="text-text-muted text-xs">({t.optional})</span></label>
        <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder={t.fields.phone.placeholder} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.fields.productCategory.label} <span className="text-text-muted text-xs">({t.optional})</span></label>
          <select className={inputClass} value={form.productCategory} onChange={(e) => update("productCategory", e.target.value)}>
            <option value="">{t.fields.productCategory.placeholder}</option>
            {categoryKeys.map((key) => (
              <option key={key} value={key}>{t.categories[key]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t.fields.productName.label} <span className="text-text-muted text-xs">({t.optional})</span></label>
          <input type="text" className={inputClass} value={form.productName} onChange={(e) => update("productName", e.target.value)} placeholder={t.fields.productName.placeholder} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.fields.quantity.label} <span className="text-text-muted text-xs">({t.optional})</span></label>
          <input type="text" className={inputClass} value={form.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder={t.fields.quantity.placeholder} />
        </div>
        <div>
          <label className={labelClass}>{t.fields.material.label} <span className="text-text-muted text-xs">({t.optional})</span></label>
          <select className={inputClass} value={form.material} onChange={(e) => update("material", e.target.value)}>
            <option value="">{t.fields.material.placeholder}</option>
            {materialKeys.map((key) => (
              <option key={key} value={key}>{t.materials[key]}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.fields.size.label} <span className="text-text-muted text-xs">({t.optional})</span></label>
        <input type="text" className={inputClass} value={form.size} onChange={(e) => update("size", e.target.value)} placeholder={t.fields.size.placeholder} />
      </div>

      <div>
        <label className={labelClass}>{t.fields.message.label} <span className="text-red-500">*</span></label>
        <textarea className={inputClass} rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder={t.fields.message.placeholder} />
        {errors.message && <p className="text-xs text-red-600 mt-1" role="alert">{errors.message}</p>}
      </div>

      {/* Privacy */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.privacyAgreed}
          onChange={(e) => update("privacyAgreed", e.target.checked)}
          className="mt-0.5 accent-tech-500"
        />
        <span className="text-xs text-text-muted">
          {t.privacy.prefix}{" "}
          <Link href={`/${locale}/privacy-policy`} className="text-tech-500 underline">{t.privacy.link}</Link>. *
        </span>
      </label>
      {errors.privacyAgreed && <p className="text-xs text-red-600" role="alert">{errors.privacyAgreed}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-tech-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            <Send size={18} />
            {t.submit}
          </>
        )}
      </button>
    </form>
  );
}
