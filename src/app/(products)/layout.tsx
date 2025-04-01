import type { PropsWithChildren } from "react";

export default function ProductsLayout({ children }: PropsWithChildren) {
  return <div className="bg-amber-200 p-4 min-h-full">
    {children}
  </div>
}