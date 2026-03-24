import MediaCatalog from "@/components/Catalog";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params;
  const currentCategory = resolvedParams.category;

  if (currentCategory !== "movie" && currentCategory !== "tv") {
    notFound();
  }

  return (
    <MediaCatalog 
      category={currentCategory as "movie" | "tv"} 
      searchParams={searchParams} 
    />
  );
}