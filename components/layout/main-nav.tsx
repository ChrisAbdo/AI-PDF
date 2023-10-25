import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function MainNav() {
  return (
    <header className="bg-background border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-2"
        aria-label="Global"
      >
        {/* <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </a> */}
        <Link href="/">PDF Chat</Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            bars
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-2">
          <Link
            href="https://twitter.com/abdo_eth"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button size="icon" variant="outline">
              <TwitterLogoIcon />
            </Button>
          </Link>

          <Link
            href="https://github.com/ChrisAbdo"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button size="icon" variant="outline">
              <GitHubLogoIcon />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
