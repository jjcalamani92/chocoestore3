import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment productDetails on Hardware {
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

    hardware
		form
		bridge
		rod
  }
`;

export const PBS = gql`
  query HardwareAll($site: String!) {
    hardwareAll(site: $site) {
      slug
    }
  }
`;

export const CATEGORY = gql`
  query HardwareAll($site: String!) {
    hardwareAll(site: $site) {
      category
    }
  }
`;
export const SECTION = gql`
  query HardwareAll($site: String!) {
    hardwareAll(site: $site) {
      category
      section
    }
  }
`;
export const ITEM = gql`
  query HardwareAll($site: String!) {
    hardwareAll(site: $site) {
      category
      section
      item
    }
  }
`;

export const PRODUCTS_BY_ITEM = gql`
  query HardwareByCategoryAndSectionAndItem(
    $category: String!
    $section: String!
    $item: String!
    $site: String!
  ) {
    hardwareByCategoryAndSectionAndItem(
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
  query HardwareByCategoryAndSectionAndItem(
    $category: String!
    $section: String!
    $item: String!
    $site: String!
  ) {
    hardwareByCategoryAndSectionAndItem(
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
  query HardwareByFeatured($featured: String!, $site: String!) {
    hardwareByFeatured(featured: $featured, site: $site) {
      ...productDetails
    }
  }
	${PRODUCT_FRAGMENT}
`;

export const PRODUCT_BY_SLUG = gql`
  query HardwareBySlug($slug: String!, $site: String!) {
    hardwareBySlug(slug: $slug, site: $site) {
			...productDetails
    }
  }
	${PRODUCT_FRAGMENT}
`;

export const PRODUCT_ALL = gql`
  query HardwaresAll($limit: Float!, $offset: Float!, $site: String!) {
    hardwaresAll(input: { limit: $limit, offset: $offset }, site: $site) {
      ...productDetails
    }
  }
	${PRODUCT_FRAGMENT}
`;

