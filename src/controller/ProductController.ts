import { Request, Response } from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { BaseError } from "../errors/BaseError"

export class ProductController {
    public getProducts = async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.query.q
            }

            const productBusiness = new ProductBusiness()
            const output = await productBusiness.getProducts(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createProduct = async (req: Request, res: Response) => {
        try {

            const input = {
                id: req.body.id,
                name: req.body.name,
                price: req.body.price
            }

            const productBusiness = new ProductBusiness()
            const output = await productBusiness.createProduct(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}