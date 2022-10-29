import db from "@src/config/db"
import { ItemDB } from "@src/types/items"
import { OkPacket, RowDataPacket } from "mysql2"



class ItemsDBController {

    readById(user_id: number): Promise<Array<ItemDB>> {
        return new Promise((resolve, reject) => {
            const SQL = 'SELECT item_id, quantity FROM UserInventory WHERE user_id = ?;'
            db.query<Array<ItemDB & RowDataPacket>>(SQL, [user_id], (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    addItem(user_id: number, item: ItemDB): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            const SQL = `INSERT INTO
            UserInventory (user_id, item_id, quantity)
        VALUES
            (?, ?, ?) ON DUPLICATE KEY
        UPDATE
            quantity = quantity + ?;`
            const values = [user_id, item.item_id, item.quantity, item.quantity]
            db.query<OkPacket>(SQL, values, (err, res) => {
                if(err) reject(err)
                else resolve(res)
            })
        })
    }

}

export default ItemsDBController