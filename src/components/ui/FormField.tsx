import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "h-[52px] w-full rounded-[12px] border border-line-strong bg-white px-3.5 font-[inherit] text-ink aria-invalid:border-[#B42318]";
export const textareaClass =
  "w-full resize-y rounded-[12px] border border-line-strong bg-white p-3.5 font-[inherit] text-ink aria-invalid:border-[#B42318]";

type ControlProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
};

/** Champ de formulaire : libellé visible, astérisque masqué, aide et erreur reliées par aria-describedby. */
export function FormField({
  id,
  label,
  required,
  help,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const describedBy = [help && `${id}-aide`, error && `${id}-erreur`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[15px] font-semibold">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children({ id, name: id, required, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {help && (
        <span id={`${id}-aide`} className="text-[14px] text-muted">
          {help}
        </span>
      )}
      {error && (
        <span id={`${id}-erreur`} className="text-[14px] font-semibold text-[#B42318]">
          Erreur : {error}
        </span>
      )}
    </div>
  );
}

export function RequiredNote({ className }: { className?: string }) {
  return (
    <p className={cn("m-0 text-[15px] text-text", className)}>
      Les champs marqués d&apos;un astérisque (<span aria-hidden="true">*</span>) sont obligatoires.
    </p>
  );
}
