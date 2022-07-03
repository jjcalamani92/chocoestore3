import { NextPage, GetServerSideProps } from 'next';
import { IGlasses, IMark } from "../../../src/interfaces";
import { GraphQLClient } from 'graphql-request';
import { Layout, LayoutAdmin } from '../../../components/Layout';
import { MARK_BY_HREF } from '../../../src/gql/mark';
import { FormMark, HeadingTable } from '../../../components/Components';
import { useContext } from 'react';
import { UiContext } from '../../../src/context';
interface Props {
	mark: IMark;
}
const client = new GraphQLClient(`${process.env.APIP_URL}/graphql`)
const ProductPage: NextPage<Props> = ({ mark }) => {
	const { site, toggleSideSearch, toggleSideCart } = useContext(UiContext)

	return (
		<>
			<Layout
			title={site.title}
			pageDescription={site.description}
			imageFullUrl={site.logo}
			>
				<HeadingTable
						title={
							mark._id ? `Actualizar Marca` : `Crear Marca`
						} 
					/>
				<FormMark mark={mark} />
			</Layout>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { href = '' } = query

	let mark:IMark | null | any;
  // const data = await client.request(
  //   PRODUCT_BY_SLUG, { slug: query.slug, site: process.env.API_SITE }
  // );
	// console.log(query.href)
	// let product:IGlasses | null | any;
	if (href === 'new') {
		mark = {
			name: '',
			href:'',
			description: '',
			imageSrc: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
			imageAlt: ''
		}
	} else {
		// const data = await client.request(
		// 	PRODUCT_BY_SLUG, { slug: query.slug, site: process.env.API_SITE }
		// );
		const data = await client.request(
			MARK_BY_HREF, { href: query.href, site: process.env.API_SITE }
		);
		mark = data.marksByHref
	}
return {
	props: {
		mark
	},
};
}

export default ProductPage;