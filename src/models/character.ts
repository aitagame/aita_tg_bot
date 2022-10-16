import { Schema, model } from 'mongoose'

const moneySchema = {
    type: Number,
    default: 0
}

const characteristic = {
    type: Number,
    default: 1
}

const characterSchema = new Schema({
    playerID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        requierd: true
    },
    level: {
        type: Number,
        default: 0
    },
    experience: {
        type: Number,
        default: 0
    },
    characteristics: {
        attack: characteristic,
        defence: characteristic,
        critChacne: characteristic,
        critMultiplicator: characteristic,
        evadeChance: characteristic
    },
    balance: {
        death_crystals: moneySchema,
        dark_crystals: moneySchema,
        ice_crystals: moneySchema,
        fire_crystals: moneySchema,
        earth_crystals: moneySchema,
        life_crystals: moneySchema,
        wind_crystals: moneySchema
    },
    lastAction_epoch: {
        type: Number,
        default: 0
    }
})

export default model('Character', characterSchema)