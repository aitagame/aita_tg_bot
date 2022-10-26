import db from "@src/config/db"
import { ItemDB } from "@src/types/items"
import { RowDataPacket } from "mysql2"



class ItemsDBController {

    readById(user_id: number): Promise<Array<ItemDB>> {
        return new Promise((resolve, reject) => {
            const SQL = 'SELECT UserInventory.item_id, UserInventory.quantity FROM characters INNER JOIN UserInventory ON characters.user_id = ?;'
            db.query<Array<ItemDB & RowDataPacket>>(SQL, [user_id], (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

}

export default ItemsDBController