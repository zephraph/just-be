import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react";
import { AnimatedHeader } from "./AnimatedHeader";

interface NavBarProps {
  backPath?: string;
}

export const NavBar = ({ backPath }: NavBarProps) => {
  return (
    <nav className="flex justify-between items-center pt-3 pb-10 md:pt-4 md:pb-10">
      <AnimatedHeader />
      <Flex justifyContent="flex-end" width="230px" ml={3} flex={1}>
        <Link href="/about">
          <Text
            fontSize="lg"
            fontWeight="500"
            className="hover:underline cursor-pointer"
            mr={3}
          >
            About
          </Text>
        </Link>
        <Link href="/">
          <Text
            fontSize="lg"
            fontWeight="500"
            className="hover:underline cursor-pointer"
            mr={3}
          >
            Blog
          </Text>
        </Link>
        <Link href="/tips">
          <Text
            fontSize="lg"
            fontWeight="500"
            className="hover:underline cursor-pointer"
          >
            Tips
          </Text>
        </Link>
      </Flex>
    </nav>
  );
};
