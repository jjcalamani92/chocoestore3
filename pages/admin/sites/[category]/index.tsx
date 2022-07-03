import { NextPage, GetServerSideProps } from 'next';
import { Category, IGlasses } from "../../../../src/interfaces";
import { Layout, LayoutAdmin } from '../../../../components/Layout';
import { graphQLClientS } from '../../../../src/graphQLClient';
import { SBS } from '../../../../src/gql/site';
import { FormCategory } from '../../../../components/Components/form/FormCategory';
import { useRouter } from 'next/router';
import { LayoutFeaturedListAdmin, LayoutSectionListAdmin, LayoutCategoryListAdmin, HeadingTable, GridPages } from '../../../../components/Components';
import { TableFeatured } from '../../../../components/Components/table/TableFeatured';
import { TableSection } from '../../../../components/Components/table/TableSection';
import { HeadingAdmin } from '../../../../components/Components/HeadingAdmin';
import { UiContext } from '../../../../src/context';
import { useContext } from 'react';
interface Props {
	category: Category;
}
const ProductPage: NextPage<Props> = ({ category }) => {
	const { site } = useContext(UiContext)

	const router = useRouter()
	return (
		<>
			<Layout
			title={site.title}
			pageDescription={site.description}
			imageFullUrl={site.logo}
		>

				<HeadingAdmin category={`${router.query.category}`}/>
				{
					router.query.category==='new'
					?
						null
					:
					<>
					<HeadingTable 
						title='Secciones' 
						href={`/admin/sites/${router.query.category}/new`}
					/>
					
					<TableSection sections={category.sections} category={category._id}/>
					{/* <GridPages data={category.sections} category={category._id} /> */}
					<LayoutSectionListAdmin data={category.sections} category={category._id}/>
					
					<HeadingTable 
						title='Destacados' 
						href={`/admin/sites/${router.query.category}/f/new`}
					/>
					
					<TableFeatured featured={category.featured} category={category._id}/>
					<LayoutFeaturedListAdmin data={category.featured} category={category._id}/>

					</>
				}
				<HeadingTable 
						title={
							category._id ? `Actualizar Categoría` : `Crear Categoría`
						} 
					/>
				<FormCategory category={category} />
				
			</Layout>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { category = '' } = query
	let data: Category | null | any
	if (category === 'new') {
		data = {
			name: '',
			href:'',
			description: '',
			imageSrc: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
			imageAlt: ''

		}
	} else {
		const { site } = await graphQLClientS.request(SBS, { id: process.env.API_SITE })
		data = site.categories.find((data: { href: string; }) => data.href === `${category}` )
	}

	return {
		props: {
			category: data
		},
	};
}

export default ProductPage;