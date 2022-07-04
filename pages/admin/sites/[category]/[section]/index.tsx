import { NextPage, GetServerSideProps } from 'next';
import { Category, IHardware, Section } from "../../../../../src/interfaces";
import { Layout, LayoutAdmin } from '../../../../../components/Layout';
import { graphQLClientS } from '../../../../../src/graphQLClient';
import { SBS } from '../../../../../src/gql/site';
import { TableItem, FormSection } from '../../../../../components/Components';
import { useRouter } from 'next/router';
import { HeadingTable, LayoutItemsListAdmin } from '../../../../../components/Components';
import { HeadingAdmin } from '../../../../../components/Components/HeadingAdmin';
import { useContext } from 'react';
import { UiContext } from '../../../../../src/context';
interface Props {
	section: Section;
	category: string
}
const ProductPage: NextPage<Props> = ({ section, category }) => {
	const { site, toggleSideSearch, toggleSideCart } = useContext(UiContext)
	const router = useRouter()
	return (
		<>
			<Layout
			title={site.title}
			pageDescription={site.description}
		>
				<HeadingAdmin category={`${router.query.category}`} section={`${router.query.section}`}/>
				{
					router.query.section === 'new'
					? null
					:
					<>
							<HeadingTable
								title='Items' 
								href={`/admin/sites/${router.query.category}/${router.query.section}/new`}
							/>
							<TableItem items={section.items} category={category} section={section._id}/>
							<LayoutItemsListAdmin data={section.items} category={category} section={section._id}/>
						</>
				}
				<HeadingTable 
						title={
							section._id ? `Actualizar Sección` : `Crear Sección`
						} 
					/>
				<FormSection section={section} category={category} />

			</Layout>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { section = '', category = '' } = query
	let data: Section | null | any

	if (section === 'new') {
		data = {
			name: '',
			href: '',
			description: '',
			imageSrc: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
			imageAlt: ''

		}
	} else {
		const { site } = await graphQLClientS.request(SBS, { id: process.env.API_SITE })
		const dat = site.categories.find((data: { href: string; }) => data.href === `${category}`)

		data = dat.sections.find((data: { href: string; }) => data.href === `${section}`)
	}

	const { site } = await graphQLClientS.request(SBS, { id: process.env.API_SITE })
	const res = site.categories.find((data: { href: string; }) => data.href === `${category}`)
	return {
		props: {
			section: data,
			category: res._id
		},
	};
}

export default ProductPage;