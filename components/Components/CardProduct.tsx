import axios from "axios";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react"
import Swal from "sweetalert2";
import { Featured } from '../../src/interfaces/Site';

interface CardComponent {
  name: string;
  description?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  objectFit: any;

  id?: string;
  price?: number;
  oldPrice?: number;
  featured?: string;
}
export const CardComponent: FC<CardComponent> = ({ name, imageSrc, imageAlt, description, width, height, objectFit, href, price, oldPrice, featured, id }) => {
  const router = useRouter();
  const { pathname } = router
  const p = pathname.substring(1).split('/')
  // console.log(featured)
  const onDeleteData = async (id: string) => {
		Swal.fire({
			title: 'Está seguro?',
			text: "No podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, bórralo!'
		}).then( async (result) => {
			if (result.isConfirmed ) {
				Swal.fire({ 
						title: 'Eliminado!',
						text: 'El producto ha sido eliminado.',
						icon: 'success',
						timer: 1000,
						showConfirmButton: false,
					}),
				await axios.delete(`${process.env.APIP_URL}/api/glasses/${id}`)
				router.reload()
			}
		})
	}
  return (
    <div className={`${p[0] === 'admin' ? "lg:hidden" : null}`}>
      <Link href={href} className="group-hover:opacity-75">
        <a>
          <div className="w-full bg-white rounded-lg overflow-hidden   leading-none relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={width}
              height={height}
              objectFit={objectFit}
            />
            {
              oldPrice
              ?
              <span className="absolute left-0 top-2 text-xs lg:text-sm  text-rose-500 bg-gray-100 p-1"> -{`${Math.floor((Number(price)-Number(oldPrice))*100/Number(price))}`}%</span>
              : null
            }
            {
              oldPrice
              ? 
              <>
                <span className="absolute right-0 top-2  ">
                  <p className="hidden lg:block text-xs lg:text-sm bg-rose-500 text-white p-1 font-semibold"> en oferta </p>
                  <div className="lg:hidden">
                    <Image
                      src={"https://res.cloudinary.com/dvcyhn0lj/image/upload/v1656784000/etiqueta_vlolbd.png"}
                      alt="oferta"
                      width={20}
                      height={20}
                    />
                  </div>
                </span>
                
              </>
              : null
            }
          </div>
          <h3 className={`mt-1 overflow-ellipsis whitespace-nowrap overflow-hidden text-xs lg:text-sm ${p[0] === 'admin' ? " text-gray-700 " : "font-semibold text-gray-900"}`}>
            {name}

          </h3>
          {
              oldPrice
              ? <div className="flex justify-between">
                  <p className="mt-1 text-xs lg:text-sm  text-gray-500 line-through">{price}.00 Bs </p>
                  <p className="mt-1 text-xs lg:text-sm font-semibold  text-gray-900"> {oldPrice}.00 Bs</p>
                </div>
              : 
              price
              ?
              <p className="mt-1 text-xs lg:text-sm text-gray-500">{price}.00 Bs </p>
              
              : null

          }
          {
            p[0] 
            ?
            null
            : 
            <p className="mt-1 text-xs lg:text-sm  text-gray-500">{description}</p>
          }
        </a>
      </Link>
      {
            p[0] === 'admin'
              ?
              <div onClick={() => onDeleteData(`${id}`)}  className="mt-2 transition text-center duration-150 ease-in-out hover:bg-rose-600 focus:outline-none border bg-white border-1 border-rose-500 rounded px-8 py-2 text-xs lg:text-sm text-rose-600  hover:text-white hover:border-0">Eliminar</div>
							
              : null
          }
    </div>
  )
}