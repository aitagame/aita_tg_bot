/* INVENTORY TABLE */
CREATE TABLE UserInventory (
    ID INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
    PRIMARY KEY (ID),
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES characters (user_id),
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);

/* GET ITEMS LIST BY ID */
SELECT
    UserInventory.item_id,
    UserInventory.quantity
FROM
    characters
    INNER JOIN UserInventory ON characters.user_id = user_id;

/* UPDATE ITEMS */
INSERT INTO
    UserInventory (user_id, item_id, quantity)
VALUES
    (279603779, 1, 25) ON DUPLICATE KEY
UPDATE
    quantity = quantity + 25;

CREATE UNIQUE INDEX unique_inventory ON UserInventory(user_id, item_id);