import Link from "next/link";

import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex grow flex-col items-center pt-8">
        <h1 className="text-3xl font-bold">{`CloudSuite Demo's Headless Interpretation`}</h1>
      </main>
    </HydrateClient>
  );
}
