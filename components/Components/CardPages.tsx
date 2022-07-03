import axios from "axios";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react"
import Swal from "sweetalert2";

interface CardPages {
  name: string;
  description?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  objectFit: any;
  category?: string;

  id?: string;
  price?: number;
}
export const CardPages: FC<CardPages> = ({ name, imageSrc, imageAlt, description, width, height, objectFit, href, price, id, category }) => {
  const router = useRouter();
  const { pathname } = router
  const p = pathname.substring(1).split('/')

  const onDeleteData = async (id: string) => {
    
		const data = {section: id, category: category }
      
    
		Swal.fire({
			title: 'Está seguro?',
			text: "No podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, bórralo!'
		}).then( async (result) => {
			if ( pathname === '/admin' && result.isConfirmed) {
				Swal.fire({ 
						title: 'Eliminado!',
						text: 'El producto ha sido eliminado.',
						icon: 'success',
						timer: 1000,
						showConfirmButton: false,
					}),
				// await axios.delete(`${process.env.APIP_URL}/api/glasses/${id}`)
				// router.reload()
        console.log('producto')
			} 
      if (result.isConfirmed && pathname === '/admin/sites') {
				Swal.fire({ 
          title: 'Eliminado!',
          text: 'La categoría ha sido eliminado.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,

        }),
        console.log('eliminando la categoría')
      // await axios.put(`${process.env.APIS_URL}/api/site/removecategory/${process.env.API_SITE}`, {category: id})
      // router.push('/admin/sites')
			} 
      if (result.isConfirmed && pathname === '/admin/sites') {
				Swal.fire({ 
						title: 'Eliminado!',
						text: 'La sección ha sido eliminado.',
						icon: 'success',
						timer: 1000,
						showConfirmButton: false,
					}),
        console.log('eliminando la seccion')

				// await axios.put(`${process.env.APIS_URL}/api/site/removesection/${process.env.API_SITE}`, data)
				// router.push(`/admin/sites/${router.query.category}`)
			}
		})
	}
  return (
    <div className={`${p[0] === 'admin' ? "lg:hidden" : null}`}>
      <Link href={href} className="group-hover:opacity-75">
        <a>
          <div className="w-full bg-white rounded-lg overflow-hidden   leading-none">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={width}
              height={height}
              objectFit={objectFit}
            />
          </div>
          <h3 className={`mt-1 text-xs lg:text-sm ${p[0] === 'admin' ? " text-gray-700" : "  font-semibold text-gray-900"}`}>
            {name}

          </h3>
          {
            price
              ?
              <p className="mt-1 text-xs lg:text-sm  text-gray-500">{price}.00 Bs</p>
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