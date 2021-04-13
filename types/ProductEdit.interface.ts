import { Option } from '~/types/Option.interface'

export interface ProductEdit {
  brand: string
  model: string
  memory: string
  color: string
  os: string
  year: number
  price: number
  uploadImages: Option[]
}
