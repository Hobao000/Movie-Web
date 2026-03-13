export type NextPageProps<T = { id: string }> = {
  params: Promise<T>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};