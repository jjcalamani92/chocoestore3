export type Product = {
  name: string;
	brand: string;
	image: string[];
	description: string;
	category: string;
	section: string;
	item: string;
	inStock: number;
	price: number;
	oldPrice: number;
	tags: string[];
	featured: string;
  //--Optional--//
	site: string;
	status: boolean;
	client: string;
	_id?: string;
	slug: string;
	//--Hardware--//
  color: string;
  // form: string;
  // bridge: string;
  // rod: string;
}