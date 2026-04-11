export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none h-[2px] bg-gradient-to-r from-transparent via-hive-gold-light/50 to-transparent light:via-hive-gold/45 ${className ?? ""}`}
      aria-hidden
    />
  );
}
