import React from "react";
import type { NextPage } from "next";
import { useContext } from "react";
import { Home, Layout } from "../components/Layout";
import { UiContext } from "../src/context";



const Index: NextPage = () => {
	const { site, toggleSideSearch, toggleSideCart } = useContext(UiContext)
	return (
		<Layout
			title={site.title}
			pageDescription={site.description}
			imageFullUrl={site.logo}
		>
			{/* <Text className="font-extrabold text-orange-600 sm:block">Hola Jesus</Text> */}
			<Home />
		</Layout>
	);
};

export default Index;
