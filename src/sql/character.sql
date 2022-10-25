CREATE TABLE characters (
    user_id INT UNIQUE PRIMARY KEY,
    registered DATETIME DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(64) NOT NULL,
    element INTEGER,
    level INTEGER NOT NULL DEFAULT 0,
    next_level_experience INTEGER NOT NULL DEFAULT 100,
    rating INTEGER NOT NULL DEFAULT 0,
    skill_points INTEGER NOT NULL DEFAULT 0,
    experience INTEGER NOT NULL DEFAULT 0,
    attack INTEGER NOT NULL DEFAULT 5,
    armor INTEGER NOT NULL DEFAULT 5,
    crit_chance INTEGER NOT NULL DEFAULT 0,
    crit_damage INTEGER NOT NULL DEFAULT 1.5,
    evade_chance INTEGER NOT NULL DEFAULT 5,
    clan INTEGER DEFAULT NULL,
    balance JSON,
    resources JSON
);