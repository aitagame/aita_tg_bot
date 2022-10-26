import db from "@config/db";
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

    create(character: Pick<CharacterType, 'user_id' | 'name' | 'element'>): Promise<CharacterType> {
        return new Promise((resolve, reject) => {
            db.query<OkPacket>(
                'INSERT INTO characters (user_id, name, element) VALUES (?, ?, ?)',
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

    updateCharacterParams(user_id: number, options: {
        [key: keyof CharacterType]: string | number
    }): Promise<CharacterType> {
        return new Promise((resolve, reject) => {
            db.query<OkPacket>(
                `UPDATE characters SET ${Object.keys(options).map(value => `${value} = ?`).join(',')} WHERE user_id=?;`,
                { ...Object.values(options), user_id: user_id },
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