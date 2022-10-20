import db from "../db";
import { CharacterType } from "types/character";
import { OkPacket } from "mysql2";

export default class Characters {


    readAll(): Promise<Array<CharacterType>> {
        return new Promise((resolve, reject) => {
            db.query<Array<CharacterType>>("SELECT * FROM characters", (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    readById(user_id: number): Promise<CharacterType | undefined> {
        return new Promise((resolve, reject) => {
            db.query<Array<CharacterType>>('SELECT * FROM characters WHERE user_id = ?', [user_id], (err, res) => {
                if (err) reject(err)
                else resolve(res?.[0])
            })
        })
    }

    create(character: Pick<CharacterType, 'user_id' | 'name' | 'form'>): Promise<CharacterType> {
        return new Promise((resolve, reject) => {
            db.query<OkPacket>(
                'INSERT INTO characters (user_id, name, form) VALUES (?, ?, ?)',
                [
                    character.user_id,
                    character.name,
                    character.form
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



}