import { Product } from "../models/Product";
import { ProductDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "products"

    public async findProducts(q: string | undefined) {
        if (q) {
            const result: ProductDB[] = await BaseDatabase
                .connection(ProductDatabase.TABLE_PRODUCTS)
                .where("name", "LIKE", `%${q}%`)

            return result

        } else {
            const result: ProductDB[] = await BaseDatabase
                .connection(ProductDatabase.TABLE_PRODUCTS)

            return result
        }
    }

    public async findProductById(id: string) {
        const [ productDB ]: ProductDB[] | undefined[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .where({ id })

        return productDB
    }

    public async insertProduct(newProductDB: ProductDB) {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .insert(newProductDB)
    }

    public async updateProduct(productDB: ProductDB) {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .update(productDB)
            .where({ id: productDB.id })
    }

    public async deleteProductById(id: string) {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .delete()
            .where({ id })
    }
}
