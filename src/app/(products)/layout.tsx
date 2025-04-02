import type { PropsWithChildren } from "react";

export default function ProductsLayout({ children }: PropsWithChildren) {
  return <div className="bg-black p-4 min-h-full">
    {children}
  </div>
}