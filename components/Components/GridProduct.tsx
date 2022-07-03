import { useRouter } from "next/router"
import { FC } from "react"
import { Category, Item, Section } from "../../src/interfaces"
import { CardComponent } from "./CardProduct"
import { IGlasses } from '../../src/interfaces/Glasses';

interface GridProduct {
  data?: Section[] | Category[] |  Item[]
  sections?: Section[]
  categories?: Category[]
  items?: Item[]
  category?: string
  product?: IGlasses[]
}

export const GridProduct: FC<GridProduct> = ({sections, category, data, product}) => {
  const router = useRouter();
  const { pathname } = router
  const p = pathname.substring(1).split('/')
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <div 
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-6`}
          >
            {
              router.query.item  || router.query.featured
              ?
                <>
                  {product?.map((fact,i) => (
                    <CardComponent 
                      key={i}
                      name={fact.name} 
                      imageSrc={fact.image[0]} 
                      imageAlt={fact.name} 
                      description={fact.description} 
                      width={500}
                      height={500} 
                      objectFit='content'
                      href={`/detalles/${fact.slug}`}
                      price={fact.price}
                      oldPrice={fact.oldPrice}
                    />
                  ))}
                  </>
              :
              pathname === '/admin/sites'
              ?
              <>
              {data?.map((fact,i) => (
                <CardComponent 
                  key={i}
                  name={fact.name} 
                  imageSrc={fact.imageSrc} 
                  imageAlt={fact.imageAlt} 
                  description={fact.description} 
                  width={500}
                  height={500} 
                  objectFit='cover'
                  href={
                    router.query.section ? `/${router.query.category}/${router.query.section}/${fact.href}` 
                    : 
                    router.query.category ? `/${router.query.category}/${fact.href}` : ''
                  }
                />
              ))}
              </>
              :
              p[0] === 'admin'
              ?
              <>
                  {product?.map((fact,i) => (
                    <CardComponent 
                      key={i}
                      name={fact.name} 
                      imageSrc={fact.image[0]} 
                      imageAlt={fact.name} 
                      width={500}
                      height={500} 
                      objectFit='cover'
                      href={`/admin/products/${fact.slug}`}
                    />
                  ))}
                  </>
              :
              
              <>
              {data?.map((fact,i) => (
                <CardComponent 
                  key={i}
                  name={fact.name} 
                  imageSrc={fact.imageSrc} 
                  imageAlt={fact.imageAlt} 
                  description={fact.description} 
                  width={500}
                  height={500} 
                  objectFit='cover'
                  href={
                    router.query.section ? `/${router.query.category}/${router.query.section}/${fact.href}` 
                    : 
                    router.query.category ? `/${router.query.category}/${fact.href}` : ''
                  }
                />
              ))}
              </>
              
            }
            
          </div>
        </div>
      </div>
    </div>
  )
}
