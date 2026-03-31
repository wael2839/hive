type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className }: Props) {
  return (
    <h2 className={`main-title relative text-4xl! text-hive-gold! ${className ?? ""}`}>
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[80%] mt-2.5 h-[2px] bg-gradient-to-r from-transparent via-hive-gold/35 to-transparent" />
    </h2>
  );
}