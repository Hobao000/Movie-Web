import MediaDetail from "@/components/Detail";
import { notFound } from "next/navigation";

type DetailPageProps = {
  params: Promise<{ category: string; id: string }>;
};

export default async function DetailPage({ params }: DetailPageProps) {
  const resolvedParams = await params;
  const { category, id } = resolvedParams;

  if (category !== "movie" && category !== "tv") {
    notFound();
  }

  return <MediaDetail category={category as "movie" | "tv"} id={id} />;
}