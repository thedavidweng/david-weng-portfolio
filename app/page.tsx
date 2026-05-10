import { HomePageView } from "@/components/pages/HomePageView";
import { AgentView } from "@/components/pages/AgentView";

type HomePageProps = {
  searchParams: Promise<{ mode?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { mode } = await searchParams;

  if (mode === "agent") {
    return <AgentView locale="en" />;
  }

  return <HomePageView locale="en" pathname="/" />;
}
