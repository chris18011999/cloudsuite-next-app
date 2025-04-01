import { notFound } from "next/navigation";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ search_term: string}> }) {
  // Check if search_term is in query params;

  const { search_term } = await searchParams;
  if(!search_term?.trim()) notFound();

  
  return <div>This is the search page</div>
}