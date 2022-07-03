import Link from "next/link";
import React, { Component, FC } from "react";
import { useRouter } from 'next/router';

interface Props {
  category?: string
  section?: string
  item?: string
  name?: string
}

interface HeadingPrimary {
  category?: string
  section?: string
  item?: string
  name?: string
  seo?: any
  productName?: string
  productSlug?: string
}


export const HeadingAdmin: FC<Props> = ({ category, section, item }) => {
  const router = useRouter()
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto  lg:max-w-none">

          <nav aria-label="Breadcrumb" className=" pt-4 sm:pt-6">
            <ol
              role="list"
              className="max-w-2xl mx-auto flex items-center space-x-0 sm:px-0 lg:max-w-7xl "
            >
              <li>
                <div className={'items-center flex'}>
                  {/* <div className=" flex items-center"> */}
                  <Link href={`/admin/sites`} passHref prefetch={false}>
                    <a href="#" className="text-xs md:text-sm  font-medium text-gray-900 capitalize">
                      Páginas
                    </a>
                  </Link>

                </div>
              </li>
              {
                category
                  ?
                  <li>
                    {/* <div className={ `'items-center flex'`}> */}
                    <div className="flex items-center">
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-4 h-5 text-gray-300"
                        // className={"w-4 h-5 text-gray-300 flex"}
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                      <Link href={`/admin/sites/${category}`} passHref prefetch={false}>
                        <a href="#" className="text-xs md:text-sm  font-medium text-gray-900 capitalize">
                          {category}
                        </a>
                      </Link>
                    </div>
                  </li>
                  :
                  null
              }
              {
                section
                  ?
                  <li>
                    {/* <div className={ `'items-center flex'`}> */}
                    <div className=" flex items-center">
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        // className="w-4 h-5 text-gray-300"
                        className={`'w-4 h-5 text-gray-300 flex'`}
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                      <Link href={`/admin/sites/${category}/${section}`} passHref prefetch={false}>
                        <a href="#" className="text-xs md:text-sm font-medium text-gray-900 capitalize">
                          {section}
                        </a>
                      </Link>
                    </div>
                  </li>
                  :
                  null
              }
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}