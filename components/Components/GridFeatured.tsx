import { useRouter } from "next/router"
import { FC } from "react"
import { Category, Item, Section, Featured } from "../../src/interfaces"
import { CardComponent } from "./CardProduct"
import { IGlasses } from '../../src/interfaces/Glasses';
import { CardPages } from "./CardPages";

interface GridProduct {
  data?: Section[] | Category[] | Item[] | Featured []
  sections?: Section[]
  categories?: Category[]
  items?: Item[]
  category?: string
  product?: IGlasses[]
}

export const GridFeatured: FC<GridProduct> = ({ sections, category, data, product }) => {
  const router = useRouter();
  const { pathname } = router
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-6`}
          >
            {data?.map((fact, i) => (
              <CardPages
                key={i}
                name={fact.name}
                imageSrc={fact.imageSrc}
                imageAlt={fact.imageAlt}
                description={fact.description}
                width={500}
                height={500}
                objectFit='cover'
                href={`promociones/${fact.href}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
