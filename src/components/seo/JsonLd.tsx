type Props = {
  data: object;
};

/** JSON-LD for search engines — render once per page in Server Components */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
