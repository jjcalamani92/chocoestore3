import React, { FC, useContext } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Category, IGlasses, ISeo, Item, Section } from "../../../../src/interfaces";
import { ITEM, PRODUCTS_BY_ITEM, SBI } from "../../../../src/gql";
import { Layout } from "../../../../components/Layout";
import { HeadingPrimary, GridProduct } from "../../../../components/Components";
import { graphQLClientP, graphQLClientS } from "../../../../src/graphQLClient";
import { UiContext } from "../../../../src/context";

interface Props {
  items: IGlasses[]
  seo: ISeo
}

const ItemPage:FC<Props> = ({items, seo}) => {
	const { site } = useContext(UiContext)
  return (
    <>  
      <Layout
			  title={`${site.title} - ${seo.item.name}`}
        pageDescription={`${seo.item.description}`}
        imageFullUrl={seo.item.imageSrc}
    >
        <HeadingPrimary 
          seo={seo}
        />
        <GridProduct product={items} />
    </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
      const { glassesAll } = await graphQLClientP.request(ITEM , {site: `${process.env.API_SITE}`})
  
      const paths = glassesAll.map((data:IGlasses) => ({
        params: data
      }))
  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category="", section = "",  item = "" } = params as { section: string, category: string, item: string };

  const { site } = await graphQLClientS.request(SBI, {id: process.env.API_SITE})

  const res = site.categories.find((data: { href: string; }) => data.href === `${category}`)

  const re = res.sections.find((data: { href: string; }) => data.href === `${section}`)

  const r = re.items.find((data: { href: string; }) => data.href === `${item}`)


  const { glassesByCategoryAndSectionAndItem } = await graphQLClientP.request(PRODUCTS_BY_ITEM, {category: `${category}`, section: `${section}`, item: `${item}`, site: `${process.env.API_SITE}`})
  return {
    props: {
      items: glassesByCategoryAndSectionAndItem,
      seo: {
        category: {
          name: res.name,
          href: res.href
        },
        section: {
          name: re.name,
          href: re.href
        },
        item: {
          name: r.name,
          href: r.href,
          description: r.description,
          imageSrc: r.imageSrc
        }
      },
    },
    revalidate: 3
  };
};

export default ItemPage;

