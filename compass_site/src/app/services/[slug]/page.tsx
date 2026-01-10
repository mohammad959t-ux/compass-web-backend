import { ServiceDetail } from "../../../components/sections/ServiceDetail";
import { services } from "../../../content/copy";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  return <ServiceDetail slug={params.slug} />;
}
