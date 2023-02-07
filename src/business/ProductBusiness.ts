import { ProductDatabase } from "../database/ProductDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Product } from "../models/Product"
import { ProductDB } from "../types"

export class ProductBusiness {
    public getProducts = async (input: any) => {
        const { q } = input

        const productDatabase = new ProductDatabase()
        const productsDB = await productDatabase.findProducts(q)

        const products: Product[] = productsDB.map((productDB) => new Product(
            productDB.id,
            productDB.name,
            productDB.price,
            productDB.created_at
        ))

        return products
    }

    public createProduct = async (input: any) => {
        const { id, name, price } = input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof price !== "number") {
            throw new BadRequestError("'price' deve ser number")
        }

        if (name.length < 2) {
            throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres")
        }

        if (price <= 0) {
            throw new BadRequestError("'price' não pode ser zero ou negativo")
        }

        const productDatabase = new ProductDatabase()
        const productDBExists = await productDatabase.findProductById(id)

        if (productDBExists) {
            throw new BadRequestError("'id' já existe")
        }

        const newProduct = new Product(
            id,
            name,
            price,
            new Date().toISOString()
        )

        const newProductDB: ProductDB = {
            id: newProduct.getId(),
            name: newProduct.getName(),
            price: newProduct.getPrice(),
            created_at: newProduct.getCreatedAt()
        }

        await productDatabase.insertProduct(newProductDB)

        const output = {
            message: "Produto registrado com sucesso",
            product: newProduct
        }

        return output
    }
}