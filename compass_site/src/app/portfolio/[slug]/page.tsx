import { ProjectDetail } from "../../../components/sections/ProjectDetail";
import { portfolio } from "../../../content/copy";

export function generateStaticParams() {
  return portfolio.map((project) => ({ slug: project.slug }));
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  return <ProjectDetail slug={params.slug} />;
}
