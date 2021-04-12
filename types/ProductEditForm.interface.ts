import { Option } from '~/types/Option.interface'

export interface ProductEditForm {
  brand: string
  model: string
  memory: string
  color: string
  os: string
  year: number
  price: number
  uploadImages: Option[]
}
