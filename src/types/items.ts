interface ItemInterface {
    name: string,
    description: string,
    item_id: number,
    marker: string,
    can_use: boolean,
    can_craft: boolean,
    craft_require?: Array<{
        item_id: number
        quantity: number
    }>
}

export class ItemFull {
    public name!: string
    public description!: string
    public item_id!: number
    public marker!: string
    public can_use!: boolean
    public can_craft!: boolean
    public craft_require?: Array<{
        item_id: number
        quantity: number
    }>

    constructor(params: ItemInterface) {
        Object.assign(this, params)
    }
}

export type SingleItem = Pick<ItemFull, 'item_id'> & { quantity: number }

export type IItemDB = {
    item_id: number,
    quantity: number
}

export class ItemDB {
    public item_id: number
    public quantity: number
    constructor(item_id: number, quantity: number) {
        this.item_id = item_id
        this.quantity = quantity
    }
}