CREATE TABLE Users (
    user_id BIGINT UNIQUE,
    PRIMARY KEY (user_id),
    registered DATETIME DEFAULT CURRENT_TIMESTAMP,
    experience INTEGER NOT NULL DEFAULT 0,
    name VARCHAR(64) NOT NULL,
    element INTEGER,
    rating INTEGER NOT NULL DEFAULT 0,
    skill_points INTEGER NOT NULL DEFAULT 0,
    clan INTEGER DEFAULT NULL
);

+--------------+-------------+------+-----+-------------------+-------------------+
| Field        | Type        | Null | Key | Default           | Extra             |
+--------------+-------------+------+-----+-------------------+-------------------+
| user_id      | bigint      | NO   | PRI | NULL              |                   |
| registered   | datetime    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| name         | varchar(64) | NO   |     | NULL              |                   |
| element      | int         | YES  |     | NULL              |                   |
| rating       | int         | NO   |     | 0                 |                   |
| skill_points | int         | NO   |     | 0                 |                   |
| experience   | int         | NO   |     | 0                 |                   |
| clan         | int         | YES  |     | NULL              |                   |
+--------------+-------------+------+-----+-------------------+-------------------+