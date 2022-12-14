import db from "@config/db";
import { OkPacket } from "mysql2";
import { UsersFromDB } from "@src/types/sqltypes";

export default class Characters {

    readAll(): Promise<Array<UsersFromDB>> {
        return new Promise((resolve, reject) => {
            db.query<Array<UsersFromDB>>("SELECT * FROM Users", (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    readById(user_id: number): Promise<UsersFromDB | undefined> {
        return new Promise((resolve, reject) => {
            db.query<Array<UsersFromDB>>('SELECT * FROM Users WHERE user_id = ?', [user_id], (err, res) => {
                if (err) reject(err)
                else resolve(res?.[0])
            })
        })
    }

    create(character: Pick<UsersFromDB, 'user_id' | 'name' | 'element'>): Promise<UsersFromDB> {
        return new Promise((resolve, reject) => {
            db.query<OkPacket>(
                'INSERT INTO Users (user_id, name, element) VALUES (?, ?, ?)',
                [
                    character.user_id,
                    character.name,
                    character.element
                ],
                (err, res) => {
                    if (err) reject(err)
                    else this.readById(res.insertId)
                        .then(user => resolve(user!))
                        .catch(reject)
                }
            )
        })
    }

    updateExperience(user_id: number, experience: number): Promise<UsersFromDB> {
        return new Promise((resolve, reject) => {
            db.query<OkPacket>(
                `UPDATE Users SET experience=experience + ? WHERE user_id=?;`,
                [experience, user_id],
                (err, res) => {
                    if (err) reject(err)
                    else this.readById(res.insertId)
                        .then(user => resolve(user!))
                        .catch(reject)
                }
            )
            
        })
    }

}