export type Product = {
    id: string
    brand: string
    model: string
    memory: string
    color: string
    os: string
    year: number
    price: number
    is_published: boolean
    is_sold: boolean
    is_deleted: boolean
    created_at: string | null
    updated_at: string | null
}