import React from 'react'
import { CategoriesList, CategorySection } from './styles'
import { Link } from 'react-router-dom'

interface Props {
  className?: string
  items: MenuCategoryItem[]
}

export interface MenuCategoryItem {
  slug: string
  name: string
  catId: number
}

const Categories: React.FC<Props> = (props: Props) => {
  return (
    <CategorySection>
      <CategoriesList className={props.className}>
        {props.items.map((item) => {
          return (
            <li key={`menu-item-${item.slug}`}>
              <span>
                <Link to={'/categorias/' + item.catId + '/' + item.slug}>{item.name}</Link>
              </span>
            </li>
          )
        })}
      </CategoriesList>
    </CategorySection>
  )
}

export default Categories
