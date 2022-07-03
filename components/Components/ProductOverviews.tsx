import { faFacebookF, faInstagram, faLinkedin, faPinterest, faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, useContext, useState, } from "react";
import { UiContext } from "../../src/context";
import { IGlasses } from "../../src/interfaces";
import { SwiperDetail } from "./Swiper";
import { useRouter } from 'next/router';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface Props {
	product: IGlasses;
}

export const ProductOverviews: FC<Props> = ({ product }) => {
	const { site } = useContext(UiContext)
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2])
	const router = useRouter()
	return (
		<>
			<section className="bg-white" >
				{/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl grid  grid-cols-1 md:gap-4 lg:grid-cols-5"> */}
				<div className="max-w-2xl mx-auto py-0 px-4 sm:px-0 lg:max-w-7xl lg:py-0 lg:px-8 grid grid-cols-1 lg:gap-6 lg:grid-cols-5">
					<div className="col-span-3" >
						<SwiperDetail image={product.image} />
					</div>
					<div className="col-span-2 mt-3 lg:mt-0" >
						<div className="mb-4">
							<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
								{product.name}
							</h1>
						</div>
						<div className="mb-4">
							{
								product.oldPrice
								? 
								<div className='flex '>
									<p className="text-3xl text-gray-500 line-through mr-2">{product.price}.00 Bs </p>
									<p className="font-semibold text-3xl text-gray-900 ">{product.oldPrice}.00 Bs </p>
								</div>
								:
								<p className="text-3xl text-gray-900 ">{product.price}.00 Bs </p>
							}
							
						</div>
						<div className="mb-4">
						<form >
							<div className="mt-6">
                {/* <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Tallas</h3>
                  <a href="#" className="text-sm font-medium text-rose-600 hover:text-rose-500">
                    Guia de tallas
                  </a>
                </div> */}

                {/* <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size, i) => (
                      <RadioGroup.Option
                        key={i}
                        value={size}
                        // disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size
                            // size.inStock
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-rose-500' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                            {/* {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-rose-500' : 'border-transparent',
                                  'absolute -inset-px rounded-md pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                              >
                                <svg
                                  className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )} 
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup> */}
              </div>
								{/* <button
									type="submit"
									className="mt-10 w-full bg-rose-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
								>
									Agregar al carrito
								</button> */}
							</form>
							{/* <form className="mt-5">
								<button
									type="submit"
									className="mt-4 w-full bg-rose-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
								>
									Agregar al carrito
								</button>
							</form> */}
							<a
								href={`https://wa.me/591${site.numberPhone}?text=Hola%20me%20interesa%20este%20producto:%20https://${site.domain}/detalles/${product.slug}`}
								target={'blank'}
								className="mt-3 w-full bg-rose-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
							>
								Preguntar por WhatsApp
							</a>
						</div>
						<div className="mb-4">
							<h2 className="text-sm font-medium text-gray-900">Detalles</h2>
							<div className="mt-4 space-y-3">
								<p className="text-xs md:text-sm text-gray-600">{product.description}</p>
							</div>
						</div>
						<div className="mb-4">
							<h2 className="text-sm font-medium text-gray-900 mb-4">Compartir</h2>
							<div className="grid grid-cols-7 gap-2 text-rose-500 ">

								<Link href={`https://www.facebook.com/sharer.php?u=https://${site.domain}${router.asPath}`}>
									<a target={'_blank'}>
										<FontAwesomeIcon
											className="w-6 h-6 hover:text-rose-600"
											icon={faFacebookF}
										/>
									</a>
								</Link>
								<Link href={'#'}>
									<a target={'_blank'}>
										<FontAwesomeIcon
											className="w-6 h-6 hover:text-rose-600"
											icon={faInstagram}
										/>
									</a>
								</Link>
								<Link href={'#'}>
									<a target={'_blank'}>
										<FontAwesomeIcon
											className="w-6 h-6 hover:text-rose-600"
											icon={faTwitter}
										/>
									</a>
								</Link>
								<Link href={'#'}>
									<a target={'_blank'}>
										<FontAwesomeIcon
											className="w-6 h-6 hover:text-rose-600"
											icon={faLinkedin}
										/>
									</a>
								</Link>
								<Link href={'#'}>
									<a target={'_blank'}>
										<FontAwesomeIcon
											className="w-6 h-6 hover:text-rose-600"
											icon={faPinterest}
										/>
									</a>
								</Link>
								<Link href={'#'}>
									<a target={'_blank'}>
										<FontAwesomeIcon
											className="w-6 h-6 hover:text-rose-600"
											icon={faWhatsapp}
										/>
									</a>
								</Link>
								<Link href={'#'}>
									<a target={'_blank'}>
										<FontAwesomeIcon
											className="w-6 h-6 hover:text-rose-600"
											icon={faTelegram}
										/>
									</a>
								</Link>

							</div>
						</div>
					</div>

				</div>
			</section>
		</>
	)
}
