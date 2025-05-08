import type { PropsWithChildren } from "react";

export default function ProductsLayout({ children }: PropsWithChildren) {
  return <div className="p-4 min-h-full max-w-7xl mx-auto">
    {children}
  </div>
}