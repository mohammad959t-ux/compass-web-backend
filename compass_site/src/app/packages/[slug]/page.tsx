import { PackageDetail } from "../../../components/sections/PackageDetail";
import { packages } from "../../../content/copy";

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export default function PackagePage({ params }: { params: { slug: string } }) {
  return <PackageDetail slug={params.slug} />;
}
