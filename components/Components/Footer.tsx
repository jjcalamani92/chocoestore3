import { faFacebookF, faInstagram, faLinkedin, faPinterest, faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { UiContext } from "../../src/context"

export const Footer = () => {
  const { site } = useContext(UiContext)

  return (
    <>
      <div className="bg-white mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none py-16">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6`}
            >
              <ul>
                {site.categories.map((category, i) => (
                  <li key={i} className="mb-3">

                    <Link href={`/${category.href}`}>
                      <a className="text-xs md:text-sm font-medium leading-none hover:text-brand  text-gray-800 ">{category.name}</a>
                    </Link>
                  </li>
                ))
                }

              </ul>
              <ul>
                {site.categories.map((category, i) => (
                  category.sections.map((section, i) => (

                    <li key={i} className="mb-3">

                      <Link href={`/${category.href}/${section.href}`}>
                        <a className="text-xs md:text-sm  font-medium leading-none hover:text-brand  text-gray-800 ">{section.name}</a>
                      </Link>
                    </li>
                  ))
                ))
                }
              </ul>
              <ul>
                <li className="text-xs md:text-sm leading-none hover:text-brand  text-gray-800 font-medium py-3">
                  Lunes:
                  <span className="ml-2 font-normal">08:00 am - 16:00 pm</span>
                </li>
                <li className="text-xs md:text-sm leading-none hover:text-brand  text-gray-800 font-medium py-3">
                  Martes:
                  <span className="ml-2 font-normal">08:00 am - 16:00 pm</span>
                </li>
                <li className="text-xs md:text-sm leading-none hover:text-brand  text-gray-800 font-medium py-3">
                  Miercoles:
                  <span className="ml-2 font-normal">08:00 am - 16:00 pm</span>
                </li>
                <li className="text-xs md:text-sm leading-none hover:text-brand  text-gray-800 font-medium py-3">
                  Jueves:
                  <span className="ml-2 font-normal">08:00 am - 16:00 pm</span>
                </li>
                <li className="text-xs md:text-sm leading-none hover:text-brand  text-gray-800 font-medium py-3">
                  Viernes:
                  <span className="ml-2 font-normal">08:00 am - 16:00 pm</span>
                </li>
                <li className="text-xs md:text-sm leading-none hover:text-brand  text-gray-800 font-medium py-3">
                  Sabado:
                  <span className="ml-2 font-normal">08:00 am - 16:00 pm</span>
                </li>
                <li className="text-xs md:text-sm leading-none hover:text-brand  text-gray-800 font-medium py-3">
                  Domingo:
                  <span className="ml-2 font-normal">08:00 am - 16:00 pm</span>
                </li>

              </ul>
              <ul>
                <li className="mb-6">
                  <Link href="/contacto">
                    <a className="text-xs md:text-sm  font-medium leading-none hover:text-brand  text-gray-800 ">Contacto</a>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link href="#">
                    <a className="text-xs md:text-sm  font-medium leading-none hover:text-brand  text-gray-800 ">Preguntas Frecuentes</a>
                  </Link>
                </li>
                <li className="mb-6">
                  <h2 className="text-xs md:text-sm font-medium text-gray-900 mb-4">RRSS</h2>
                  <div className="grid grid-cols-5 gap-2 text-rose-500 ">

                    <Link href={`https://www.facebook.com`}>
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
                </li>
              </ul>

            </div>
            <div className="py-2 flex flex-col justify-center items-center">
              <Link href="/" className=''>
                <a className='flex items-center'>
                  <Image
                    width={250}
                    height={100}
                    src={site.logo}
                    objectFit={'contain'}
                    alt=""
                  />
                </a>
              </Link>

              <p className="mt-6 text-xs md:text-sm leading-none text-gray-900 ">2022 {site.title}. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}