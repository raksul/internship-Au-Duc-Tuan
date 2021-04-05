import { Option } from '~/types/Option.interface'
import { Brand } from '~/types/Brand.interface'

export interface OS {
  id: string
  versions: Option[]
  brands: Brand[]
}
