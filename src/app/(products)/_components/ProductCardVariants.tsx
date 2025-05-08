import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { env } from "~/env";
import type { ProductVariant } from "~/server/api/routers/products";

export const ProductVariants = ({
  variants,
}: {
  variants: ProductVariant[];
}) => {
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {variants
        .filter((v) => !!v.picture)
        .map((variant) => (
          <TooltipProvider key={variant.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/p/product/${variant.id}`}
                  className="cursor-pointer overflow-hidden rounded-xs border border-slate-300 bg-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-300"
                >
                  <img
                    src={`${env.NEXT_PUBLIC_IMAGE_ROOT}${variant.picture.mini}`}
                    alt={variant.name}
                    className="pointer-events-none block size-6 object-cover"
                  />
                </Link>
              </TooltipTrigger>

              <TooltipContent>{variant.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </div>
  );
};
