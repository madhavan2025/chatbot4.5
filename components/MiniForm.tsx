"use client";

import { useState } from "react";

type FormField = {
  name: string;
  label?: string;
  type: "text" | "email" | "password" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
};

type DynamicFormConfig = {
  id: string;
  title: string;
  successMessage: string;
  fields: FormField[];
  submitLabel: string;
};

type MiniFormProps = {
  config: DynamicFormConfig;
};

export function MiniForm({ config }: MiniFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
const [errors, setErrors] = useState<Record<string, string>>({});
const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const validate = () => {
  const newErrors: Record<string, string> = {};

  config.fields.forEach((field) => {
    if (field.required && !formData[field.name]?.trim()) {
      newErrors[field.name] = `${field.label || field.name} is required`;
    }

    if (
      field.type === "email" &&
      formData[field.name] &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])
    ) {
      newErrors[field.name] = "Invalid email address";
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ prevents page reload
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/forms/${config.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true); // ✅ show success message
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border bg-green-50 p-4 text-sm">
        {config.successMessage}
      </div>
    );
  }


  if (submitted) {
    return (
      <div className="rounded-xl border bg-green-50 p-4 text-sm">
        {config.successMessage}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-background p-4 space-y-3"
    >
      <h3 className="text-sm font-semibold">{config.title}</h3>

      {config.fields.map((field) => (
        <div key={field.name}>
          {field.label && (
            <label className="block text-xs mb-1">
              {field.label}
            </label>
          )}

          {field.type === "textarea" ? (
            <textarea
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder={field.placeholder}
                value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            
              
            />
          ) : field.type === "select" ? (
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="">Select</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder={field.placeholder}
               value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
          {errors[field.name] && (
            <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
        <button
        type="submit"
        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? "Submitting..." : config.submitLabel}
      </button>
    </form>
  );
}
