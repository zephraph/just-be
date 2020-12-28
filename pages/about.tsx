import { NextSeo } from "next-seo";
import { NotionRenderer } from "react-notion";
import { GetStaticProps } from "next";
import { fetchPageById } from "lib/notion";
import { Flex } from "@chakra-ui/react";
import { GitHub, Twitter } from "react-bytesize-icons";
import { Title } from "lib/components/title";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      page: (await fetchPageById(process.env.ABOUT_ID)).recordMap.block,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

const AboutPage = ({ page }) => {
  return (
    <>
      <NextSeo
        title="Just Be | About me"
        description="A little about who I am"
      />
      <article>
        <Title text="About me" />
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
