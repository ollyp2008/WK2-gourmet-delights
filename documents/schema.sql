-- Tbl_User
CREATE TABLE Tbl_User (
    User_ID SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL
);

-- Tbl_Recipe
CREATE TABLE Tbl_Recipe (
    Recipe_ID SERIAL PRIMARY KEY,
    recipe_name VARCHAR(50) NOT NULL,
    recipe_difficulty VARCHAR(20) NOT NULL CHECK (recipe_difficulty IN ('Easy','Medium','Hard')),
    recipe_time INT NOT NULL CHECK (recipe_time > 0),
    calories INT NOT NULL CHECK (calories > 0),
    dietary_requirements VARCHAR(50),
    contains_nuts BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tbl_Ingredients
CREATE TABLE Tbl_Ingredients (
    Ingredient_ID SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(50) NOT NULL
);

-- Tbl_Loyalty
CREATE TABLE Tbl_Loyalty (
    Loyalty_ID SERIAL PRIMARY KEY,
    User_ID INT NOT NULL REFERENCES Tbl_User(User_ID) ON DELETE CASCADE,
    loyalty_points INT NOT NULL CHECK (loyalty_points >= 0)
);

-- Tbl_Recipe_ingredients
CREATE TABLE Tbl_Recipe_ingredients (
    Recipe_ingredients_ID SERIAL PRIMARY KEY,
    Recipe_ID INT NOT NULL REFERENCES Tbl_Recipe(Recipe_ID) ON DELETE CASCADE,
    Ingredients_ID INT NOT NULL REFERENCES Tbl_Ingredients(Ingredient_ID) ON DELETE CASCADE,
    quantity_value DECIMAL(10,2) NOT NULL CHECK (quantity_value > 0),
    quantity_unit VARCHAR(10) NOT NULL
);

-- Tbl_User_Recipes
CREATE TABLE Tbl_User_Recipes (
    User_Recipe_ID SERIAL PRIMARY KEY,
    User_ID INT NOT NULL REFERENCES Tbl_User(User_ID) ON DELETE CASCADE,
       Recipe_ID INT NOT NULL REFERENCES Tbl_Recipe(Recipe_ID) ON DELETE CASCADE,
    Date DATE NOT NULL DEFAULT CURRENT_DATE);

--Order for INSERT Statements
--Tbl_User - No dependencies. Insert all users first.
--Tbl_Recipe - No dependencies. Insert all recipes next.
--Tbl_Ingredients - No dependencies. Insert all ingredients next.
--Tbl_Loyalty - Depends on Tbl_User. Insert loyalty records after users.
-- Tbl_Recipe_ingredients - Depends on Tbl_Recipe and Tbl_Ingredients. Insert after both recipes and ingredients are populated.
--Tbl_User_Recipes - Depends on Tbl_User and Tbl_Recipe. Insert after users and recipes are populated.

-- Tbl_User
INSERT INTO Tbl_User (user_name, user_email) VALUES
('Sarah', 'sarah@example.com'),
('Mo', 'mo@example.com'),
('Priya', 'priya@example.com'),
('Liam', 'liam@example.com'),
('Aisha', 'aisha@example.com');

-- Tbl_Recipe
INSERT INTO Tbl_Recipe (recipe_name, recipe_difficulty, recipe_time, calories, dietary_requirements, contains_nuts) VALUES
('Lentil Curry', 'Medium', 120, 965, 'Vegetarian', TRUE),
('Pasta Bake', 'Easy', 60, 800, 'Vegetarian', TRUE),
('Berry Smoothie', 'Easy', 15, 450, 'Vegan', TRUE),
('Veg Stir-Fry', 'Medium', 90, 680, 'Vegetarian', FALSE);

-- Tbl_Ingredients
INSERT INTO Tbl_Ingredients (ingredient_name) VALUES
('Lentils'),
('Coconut milk'),
('Spinach'),
('Pasta'),
('Cheese'),
('Tomatoes'),
('Berries'),
('Yoghurt');

-- Tbl_Loyalty
INSERT INTO Tbl_Loyalty (User_ID, loyalty_points) VALUES
(1, 120),
(2, 80),
(3, 95),
(4, 40),
(5, 150);

-- Tbl_Recipe_ingredients
INSERT INTO Tbl_Recipe_ingredients (Recipe_ID, Ingredients_ID, quantity_value, quantity_unit) VALUES
(1, 1, 200, 'g'),      -- Lentil Curry, Lentils
(1, 2, 150, 'ml'),     -- Lentil Curry, Coconut milk
(1, 3, 100, 'g'),      -- Lentil Curry, Spinach
(2, 4, 150, 'g'),      -- Pasta Bake, Pasta
(2, 5, 80, 'g'),       -- Pasta Bake, Cheese
(2, 6, 100, 'g'),      -- Pasta Bake, Tomatoes
(3, 7, 100, 'g'),      -- Berry Smoothie, Berries
(3, 8, 150, 'g');      -- Berry Smoothie, Yoghurt

-- Tbl_User_Recipes
INSERT INTO Tbl_User_Recipes (User_ID, Recipe_ID, Date) VALUES
(1, 1, '2025-12-01'),
(2, 2, '2025-12-02'),
(3, 3, '2025-12-03'),
(4, 4, '2025-12-04');