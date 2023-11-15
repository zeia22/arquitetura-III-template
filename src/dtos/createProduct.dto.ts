import z from 'zod'

export interface CreateProductInputDTO {
  id: string,
  name: string,
  price: number
}

export interface CreateProductOutputDTO {
  message: string,
  product: {
    id: string,
    name: string,
    price: number,
    createdAt: string
  }
}

export const CreateProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  price: z.number().gt(0)
}).transform(data => data as CreateProductInputDTO)
