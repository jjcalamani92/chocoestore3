import Link from "next/link";
import React, { Component, FC } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title?: string
  href?: string
  category?: string
  section?: string
  item?: string
  name?: string
}


export const HeadingTable: FC<Props> = ({ category, section, item, name, title, href }) => {
  return (

    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">

          <div className="my-6 flex flex-row lg:flex-row items-center lg:items-center justify-between sm:overflow-hidden">
            <h4 className="text-2xl font-bold leading-tight text-gray-800">{title}</h4>
            {
              href
                ?
                <Link href={`${href}`}>
                  <a className="transition duration-150 ease-in-out hover:bg-rose-600 focus:outline-none border bg-rose-500 rounded text-white px-8 
            py-2 text-md sm:text-sm">
                    <div className="hidden sm:flex">
                      Crear
                    </div>
                    <FontAwesomeIcon
                      className="sm:hidden"
                      icon={faCirclePlus}
                    />
                  </a>
                </Link>
                : null
            }

          </div>
        </div>
      </div>
    </div>
  );

}
