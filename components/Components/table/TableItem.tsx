import Image from "next/image";
import { useRouter } from 'next/router';
import Link from "next/link";
import React, { FC, useState } from "react";
import { Category, IGlasses, Item, Site } from "../../../src/interfaces";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Swal from "sweetalert2";

interface Props {
  items: Item[];
  category: string;
  section: string;
}


export const TableItem: FC<Props> = ({ items, category, section }) => {
  const router = useRouter()
  const [show, setShow] = useState(null);

  const onDeleteData = async (id: string) => {
    const data = { item: id, category: category, section: section }
    Swal.fire({
			title: 'Está seguro?',
			text: "No podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, bórralo!'
		}).then( async (result) => {
			if (result.isConfirmed) {
				Swal.fire({ 
						title: 'Eliminado!',
						text: 'La sección ha sido eliminado.',
						icon: 'success',
						timer: 1000,
						showConfirmButton: false,
					}),
				// await axios.put(`${process.env.APIS_URL}/api/site/removecategory/${process.env.API_SITE}`, {category: id})
				await axios.put(`${process.env.APIS_URL}/api/site/removeitem/${process.env.API_SITE}`, data)
        router.push(`/admin/sites/${router.query.category}/${router.query.section}`)

			}
		})
  }
  return (
    <>
      <div className="bg-white hidden lg:block ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            
            <div className="sm:shadow sm:rounded-md  sm:overflow-hidden">
              <div className="grid grid-cols-12 gap-2   content-center px-2 py-5">
                <div className="col-span-2 items-center ">
                  <p className="text-base font-medium leading-none text-gray-900 mr-2 ">
                    Nombre
                  </p>
                </div>
                <div className="col-span-4 items-center ">
                  <p className="text-base font-medium leading-none text-gray-900 mr-2 ">
                    Descripción
                  </p>
                </div>
                <div className="items-center ">
                  <p className="text-base font-medium leading-none text-gray-900 mr-2 ">
                    Imagen
                  </p>
                </div>
                <div className="col-span-4 items-center ">
                  <p className="text-base font-medium leading-none text-gray-900 mr-2 ">
                    Descripción de la imagen
                  </p>
                </div>
                <div></div>
              </div>
              {
                items.map((item, i) => (
                  <div className="grid grid-cols-12 gap-2 border border-gray-100 p-2 "  key={i}>
                    
                    <div className="col-span-2 flex items-center">
                      <p className="text-sm leading-normal text-gray-600 ">
                        {item.name}
                      </p>
                    </div>
                    <div className="col-span-4 flex items-center">
                      <p className="text-sm leading-normal text-gray-600 ">
                        {item.description}

                      </p>
                    </div>
                    <div className="flex items-center">
                    <div className="rounded-lg bg-white overflow-hidden group-hover:opacity-75 leading-none">
                          <Image
                            src={item.imageSrc}
                            alt={item.name}
                            height={100}
                            width={100}
                            objectFit='cover'
                          />
                        </div>
                    </div>
                    <div className="col-span-4 flex items-center">
                      <p className="text-sm  leading-normal text-gray-600 ">
                      {item.imageAlt}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Link href={`/admin/sites/${router.query.category}/${router.query.section}/${item.href}`} >
                          <a>
                            <FontAwesomeIcon
                              className="text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none h-5 w-5"
                              icon={faPenToSquare}
                            />
                          </a>
                        </Link>
                        <div onClick={() => onDeleteData(item._id)} >
                          <a>
                            <FontAwesomeIcon
                              className="text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none h-5 w-5"
                              icon={faCircleMinus}
                            />
                          </a>
                        </div>
                    </div>
                  </div>
                ))
              }
            </div>
            
          </div>
        </div>
      </div>

    </>
  );
};
