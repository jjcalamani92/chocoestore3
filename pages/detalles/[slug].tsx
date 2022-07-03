import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Category, IGlasses, ISeo, Item, Section } from "../../src/interfaces";
import { PBS, PRODUCT_BY_SLUG } from "../../src/gql";
import { ProductOverviews, HeadingPrimary } from "../../components/Components";
import { Layout } from "../../components/Layout";
import { graphQLClientP, graphQLClientS } from "../../src/graphQLClient";
import { SBI } from "../../src/gql/site";

interface SlugPage {
	product: IGlasses
	seo: ISeo
}

const SlugPage: NextPage<SlugPage> = ({ product, seo }) => {
	return (
		<Layout
			title={product.name}
			pageDescription={product.description}
			imageFullUrl={product.image[0]}
		>
			<HeadingPrimary seo={seo} productName={product.name} productSlug={product.slug} />
			<ProductOverviews product={product} />
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { glassesAll } = await graphQLClientP.request(PBS , {site: `${process.env.API_SITE}`})

	const paths = glassesAll.map((data: IGlasses) => ({
		params: { slug: data.slug }
	}));
	return {
		paths,
		fallback: "blocking"
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = "" } = params as { slug: string };

	const { glassesBySlug } = await graphQLClientP.request(PRODUCT_BY_SLUG, {slug: `${slug}`, site: `${process.env.API_SITE}`})
		const { site } = await graphQLClientS.request(SBI, {id: process.env.API_SITE})
	const res = site.categories.find(findCategory)
	function findCategory(res:Category){
		return res.href === `${glassesBySlug.category}`;
	}
  const re = res.sections.find(findSection)
	function findSection(re:Section){
		return re.href === `${glassesBySlug.section}`;
	}
  const r = re.items.find(findItem)
	function findItem(r:Item){
		return r.href === `${glassesBySlug.item}`;
	}
	return {
		props: {
			product: glassesBySlug,
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
          href: r.href
        }
      },

    },
    revalidate: 3
  }
};
export default SlugPage;
