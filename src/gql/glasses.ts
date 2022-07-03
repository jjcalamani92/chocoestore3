import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment productDetails on Glasses {
    _id
    name
    brand
    description
    image
    inStock
    slug
    category
    section
    item
    price
		oldPrice
    tags
    featured

    glasses
		form
		bridge
		rod
  }
`;

export const PBS = gql`
  query GlassesAll($site: String!) {
    glassesAll(site: $site) {
      slug
    }
  }
`;

export const CATEGORY = gql`
  query GlassesAll($site: String!) {
    glassesAll(site: $site) {
      category
    }
  }
`;
export const SECTION = gql`
  query GlassesAll($site: String!) {
    glassesAll(site: $site) {
      category
      section
    }
  }
`;
export const ITEM = gql`
  query GlassesAll($site: String!) {
    glassesAll(site: $site) {
      category
      section
      item
    }
  }
`;

export const PRODUCTS_BY_ITEM = gql`
  query GlassesByCategoryAndSectionAndItem(
    $category: String!
    $section: String!
    $item: String!
    $site: String!
  ) {
    glassesByCategoryAndSectionAndItem(
      category: $category
      section: $section
      item: $item
      site: $site
    ) {
      name
      price
      oldPrice
      featured
      image
      slug
    }
  }
`;
export const PRODUCTS_BY_SECTION = gql`
  query GlassesByCategoryAndSectionAndItem(
    $category: String!
    $section: String!
    $item: String!
    $site: String!
  ) {
    glassesByCategoryAndSectionAndItem(
      category: $category
      section: $section
      item: $item
      site: $site
    ) {
      name
      price
      image
      slug
    }
  }
`;






export const PRODUCT_BY_FEATURED = gql`
  query GlassesByFeatured($featured: String!, $site: String!) {
    glassesByFeatured(featured: $featured, site: $site) {
      ...productDetails
    }
  }
	${PRODUCT_FRAGMENT}
`;

export const PRODUCT_BY_SLUG = gql`
  query GlassesBySlug($slug: String!, $site: String!) {
    glassesBySlug(slug: $slug, site: $site) {
			...productDetails
    }
  }
	${PRODUCT_FRAGMENT}
`;

export const PRODUCT_ALL = gql`
  query GlassessAll($limit: Float!, $offset: Float!, $site: String!) {
    glassessAll(input: { limit: $limit, offset: $offset }, site: $site) {
      ...productDetails
    }
  }
	${PRODUCT_FRAGMENT}
`;

