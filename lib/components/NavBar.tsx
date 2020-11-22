import { ArrowLeft } from "react-bytesize-icons";
import Link from "next/link";
import { IconButton, Fade } from "@chakra-ui/react";

interface NavBarProps {
  backPath?: string;
}

export const NavBar = ({ backPath }: NavBarProps) => {
  return (
    <nav className="flex justify-center items-center pt-4 pb-6 md:pt-8 md:pb-10">
      {backPath && (
        <Link href={backPath}>
          <IconButton
            aria-label="Navigate to previous view"
            icon={<ArrowLeft />}
            size="sm"
            variant="ghost"
            p="0.35rem"
            mr={3}
          />
        </Link>
      )}
      <hr className="w-full h-full" />
      <span className="whitespace-no-wrap text-5xl px-4 font-thin text-gray-800">
        JB
      </span>
      <hr className="w-full h-full" />
    </nav>
  );
};
