"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CONTACT_SERVICE_OTHER } from "@/lib/contact-constants";

export type ContactServiceOption = { id: string; label: string };

type Props = {
  name: string;
  placeholder: string;
  options: ContactServiceOption[];
  onInteract?: () => void;
};

const triggerClass =
  "flex w-full items-center justify-between gap-3 rounded-md border border-hive-border bg-[var(--hive-bg)] px-4 py-3 text-start text-sm outline-none transition focus:border-hive-gold/50 focus:outline-none light:bg-white light:text-neutral-900";

const listClass =
  "absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md border border-hive-border bg-[var(--hive-bg)] py-1 light:bg-white";

const optionClass =
  "flex w-full px-4 py-2.5 text-start text-sm text-hive-off-white/90 transition hover:bg-neutral-800 hover:text-hive-gold-light light:text-neutral-800 light:hover:bg-neutral-100 light:hover:text-neutral-900";

const optionSelectedClass =
  "bg-neutral-800 text-hive-gold-light light:bg-amber-100 light:text-neutral-900";

export function ContactServiceSelect({
  name,
  placeholder,
  options,
  onInteract,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const triggerId = useId();

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const onReset = () => {
      setValue("");
      setOpen(false);
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const selected = options.find((o) => o.id === value);
  const displayLabel = selected?.label ?? placeholder;
  const showPlaceholder = !value;

  function pick(id: string) {
    setValue(id);
    setOpen(false);
    onInteract?.();
  }

  return (
    <div ref={rootRef} className="relative mt-2">
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        id={triggerId}
        className={triggerClass}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <span
          className={
            showPlaceholder
              ? "text-hive-off-white/40 light:text-neutral-500"
              : "text-hive-off-white light:text-neutral-900"
          }
        >
          {displayLabel}
        </span>
        <span
          className={`shrink-0 text-hive-gold transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={triggerId}
          className={listClass}
        >
          <li
            role="presentation"
            className="border-b border-hive-border/50 pb-1 mb-1 light:border-neutral-200"
          >
            <button
              type="button"
              role="option"
              aria-selected={value === ""}
              className={`${optionClass} ${value === "" ? optionSelectedClass : ""}`}
              onClick={() => pick("")}
            >
              {placeholder}
            </button>
          </li>
          {options.map((opt) => (
            <li
              key={opt.id}
              role="presentation"
              className={
                opt.id === CONTACT_SERVICE_OTHER
                  ? "border-t border-hive-border/50 mt-0.5 pt-0.5 light:border-neutral-200"
                  : undefined
              }
            >
              <button
                type="button"
                role="option"
                aria-selected={value === opt.id}
                className={`${optionClass} ${
                  value === opt.id ? optionSelectedClass : ""
                } ${
                  opt.id === CONTACT_SERVICE_OTHER
                    ? "font-medium text-hive-gold-light/95 light:text-hive-gold"
                    : ""
                }`}
                onClick={() => pick(opt.id)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
