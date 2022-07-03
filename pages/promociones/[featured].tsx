import { GetStaticPaths, GetStaticProps } from "next";
import { Category,Section, IGlasses, ISeo, Featured } from "../../src/interfaces";
import React, { FC, useContext } from "react";
import { PRODUCT_BY_FEATURED, SBF } from "../../src/gql";
import { Layout } from "../../components/Layout";
import { CategoryPreviews01, HeadingPrimary, LayoutSectionList, GridProduct, HeadingFeatured } from "../../components/Components";
import { graphQLClientP, graphQLClientS } from '../../src/graphQLClient';
import { UiContext } from "../../src/context";

interface Props {
  seo: ISeo
  section: Section
  feature: Featured
  products: IGlasses[]
}

const FeaturedPage:FC<Props> = ({seo, section, feature, products}) => {
	const { site } = useContext(UiContext)
  return (
    <>
      <Layout
			  title={`${site.title} - ${feature.name}`}
        pageDescription={`${feature.description}`}
        imageFullUrl={feature.imageSrc}
      >
  			<HeadingFeatured feature={feature.name} />
        <GridProduct product={products} />

      </Layout>
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const data = await graphQLClientS.request(SBF, {id: process.env.API_SITE})

	const pat = data.site.categories.reduce((allFeatured: Featured[], category:Category) => {
		return [...allFeatured, ...category.featured]
	}, [])
  const paths = pat.map((data:Featured) => ({
    params: { featured: data.href}
  }))
  return {
    paths,
    fallback: "blocking"
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {  featured = "" } = params as { featured: string};
  const data = await graphQLClientS.request(SBF, {id: process.env.API_SITE})

	const pat = data.site.categories.reduce((allFeatured: Featured[], category:Category) => {
		return [...allFeatured, ...category.featured]
	}, [])
  const re = pat.find((data: { href: string; }) => data.href === `${featured}`)

  const { glassesByFeatured } = await graphQLClientP.request(PRODUCT_BY_FEATURED, {featured:  `${featured}`, site: `${process.env.API_SITE}`})

  return {
    props: { 
      feature: re, 
      products: glassesByFeatured
    },
    revalidate: 3
  };
};

export default FeaturedPage;



