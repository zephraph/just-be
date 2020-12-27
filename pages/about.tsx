import React from "react";
import { NextSeo } from "next-seo";
import { NotionRenderer } from "react-notion";
import { GetStaticProps } from "next";
import { fetchPageById } from "lib/notion";
import { Flex } from "@chakra-ui/react";
import { GitHub, Twitter } from "react-bytesize-icons";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      page: (await fetchPageById("1a6140d6770b4aabaf307586d5a39839")).recordMap
        .block,
    },
  };
};

const AboutPage = ({ page }) => {
  return (
    <>
      <NextSeo
        title="Just Be | About me"
        description="A little about who I am"
      />
      <article className="px-4 -mt-6">
        <header className="notion mb-1 flex items-center justify-between">
          <h1 className="notion-h1">About me</h1>
        </header>
        <NotionRenderer blockMap={page} />
        <Flex mt={-2}>
          <a href="https://github.com/zephraph" className="mr-4 hover:invert">
            <GitHub width={50} height={50} />
          </a>
          <a href="https://twitter.com/zephraph">
            <Twitter width={50} height={50} />
          </a>
        </Flex>
      </article>
    </>
  );
};

export default AboutPage;
