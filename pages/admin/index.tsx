import { FC, useContext, useState } from "react";
import {  PRODUCT_ALL } from '../../src/gql';
import { Spinner04, TableProduct, Pagination01, LayoutItemListAdmin, HeadingTable,  } from "../../components/Components";
import { Layout } from "../../components/Layout";
import { useQuery } from "@apollo/client";
import { UiContext } from "../../src/context";

const PAGE_SIZE = 8;

const AdminPage = () => {
	const { site } = useContext(UiContext)

  const [page, setPage] = useState(0)

	const { loading, error, data, fetchMore } = useQuery(PRODUCT_ALL, {
		variables: { limit: PAGE_SIZE, offset: page*PAGE_SIZE, site: process.env.API_SITE },  
		fetchPolicy: 'network-only',
		onCompleted: () => console.log('called'),
});
	if (loading) return <Spinner04 />;
	return (
		<>
		<Layout
			title={site.title}
			pageDescription={site.description}
			// imageFullUrl={site.logo}
		>
				<HeadingTable title='Productos' href="/admin/products/new"/>
				<TableProduct products={data.hardwaresAll} />
				{/* <GridProduct product={data.hardwaresAll}/> */}
				<LayoutItemListAdmin products={data.hardwaresAll}/>
				<Pagination01 setPage={setPage} page={page} length={data.hardwaresAll.length} all={PAGE_SIZE} />
			{/* <LayoutAdmin>
				{/* <Pagination  /> */}
			{/* </LayoutAdmin> */} 
		</Layout>
		</>

	);
};


export default AdminPage;
