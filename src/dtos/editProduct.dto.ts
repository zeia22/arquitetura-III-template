import z from 'zod'

export interface EditProductInputDTO {
  idToEdit: string,
  id: string,
  name: string,
  price: number
}

export interface EditProductOutputDTO {
  message: string,
  product: {
    id: string,
    name: string,
    price: number,
    createdAt: string
  }
}

export const EditProductSchema = z.object({
  idToEdit: z.string().min(1),
  id: z.string().min(1).optional(),
  name: z.string().min(2).optional(),
  price: z.number().gt(0).optional()
}).transform(data => data as EditProductInputDTO)