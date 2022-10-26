/* INVENTORY TABLE */
CREATE TABLE UserInventory (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES characters (user_id),
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0
);

/* GET ITEMS LIST BY ID */
SELECT
    UserInventory.item_id,
    UserInventory.quantity
FROM
    characters
    INNER JOIN UserInventory ON characters.user_id = user_id;