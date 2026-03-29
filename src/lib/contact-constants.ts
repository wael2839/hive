import { serviceSlugs, type ServiceSlug } from "@/lib/service-details";

export const CONTACT_SERVICE_OTHER = "other" as const;

export type ContactServiceId = ServiceSlug | typeof CONTACT_SERVICE_OTHER;

export function isContactServiceId(id: string): id is ContactServiceId {
  return (
    (serviceSlugs as readonly string[]).includes(id) ||
    id === CONTACT_SERVICE_OTHER
  );
}
