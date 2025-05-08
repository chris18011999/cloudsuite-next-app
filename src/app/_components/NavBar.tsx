import { api } from "~/trpc/server";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import Image from "next/image";

export default async function NavBar() {
  const trees = await api.trees.getChildrenFromTree({ id: 1, depth: 2 });

  const imageHeight = (width: number) => 86 * (width / 544); // maintain aspect ratio with width of 300

  return (
    <NavigationMenu className="sticky top-0 mx-auto flex w-7xl max-w-screen flex-1 justify-between items-center bg-white py-4">
      <NavigationMenuList className="flex flex-1 gap-4 py-2">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={imageHeight(200)}
          />
        </Link>
        <div className="flex items-center">
          {trees?.map((tree) => (
            <NavigationMenuItem key={tree.id}>
              <Link href={`/${tree.slug}/${tree.id}`} legacyBehavior passHref>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  <NavigationMenuLink>{tree.name}</NavigationMenuLink>
                </NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent className="w-full overflow-hidden">
                <div className="w-[900px]">
                  <div className="flex items-center justify-between p-2">
                    <Link href={`/${tree.slug}/${tree.id}`}>
                      <h2 className="text-xl font-bold">{tree.name}</h2>
                    </Link>
                  </div>
                  <ul className="flex max-h-96 flex-col flex-wrap gap-2">
                    {tree.children?.map((child) => (
                      <li key={child.id} className="w-fit">
                        <Link
                          href={`/${child.slug}/${child.id}`}
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink>{child.name}</NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
