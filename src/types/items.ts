export type ItemFull = {
    name: string,
    description: string,
    item_id: number,
    marker: string,
    can_use: boolean
}

export type itemsFromDB = Pick<ItemFull, 'item_id'> & { quantity: number } 