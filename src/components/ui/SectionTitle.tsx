type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className }: Props) {
  return (
    <h2 className={`main-title ${className ?? ""}`}>
      {children}
    </h2>
  );
}