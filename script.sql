
CREATE TABLE `dishes_types` (
  `id` char(36) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `typeName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `dishes_subtypes` (
  `id` char(36) NOT NULL,
  `dishTypeID` char(36) DEFAULT NULL,
  `subtype` varchar(100) DEFAULT NULL,
  `subtypeName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dishTypeID_idx` (`dishTypeID`),
  CONSTRAINT `dishTypeID` FOREIGN KEY (`dishTypeID`) REFERENCES `dishes_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `dishes` (
  `id` char(36) NOT NULL,
  `dishTypeID` char(36) NOT NULL,
  `dishSubtypeID` char(36) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` longtext,
  `ingredients` json DEFAULT NULL,
  `sizes` json DEFAULT NULL,
  `price` json DEFAULT NULL,
  `photos` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dishType_idx` (`dishTypeID`),
  KEY `dishSubtype_idx` (`dishSubtypeID`),
  CONSTRAINT `dishSubtype` FOREIGN KEY (`dishSubtypeID`) REFERENCES `dishes_subtypes` (`id`),
  CONSTRAINT `dishType` FOREIGN KEY (`dishTypeID`) REFERENCES `dishes_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `salt` varchar(256) DEFAULT NULL,
  `isVerified` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `users_data` (
  `userID` char(36) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `streetNumber` varchar(5) DEFAULT NULL,
  `apartmentNumber` varchar(5) DEFAULT NULL,
  `floor` varchar(5) DEFAULT NULL,
  UNIQUE KEY `userID_UNIQUE` (`userID`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `users_fav_dishes` (
  `userID` char(36) NOT NULL,
  `dishID` char(36) NOT NULL,
  KEY `dishID_idx` (`dishID`),
  CONSTRAINT `dishID` FOREIGN KEY (`dishID`) REFERENCES `dishes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci







-- Insert Into dishes_types Values ("ID", "TYPE", "TYPE-NAME");
Insert Into dishes_types Values ("df521750-c02d-4d41-a76b-5e45170cbd5a", "burgers", "Burgers");
Insert Into dishes_types Values ("edc6baf5-9b89-444c-9553-07c52c5294ab", "pizza", "Pizza");
Insert Into dishes_types Values ("b46a380b-32be-4843-bc27-5c25499384d8", "cakes", "Cakes");



-- Insert Into dishes_subtypes Values ("ID", "DISH-TYPE-ID", "SUBTYPE", "SUBTYPE-NAME");
-- burgers:
Insert Into food_ordering_app.dishes_subtypes Values ("c3951d41-34e6-4be1-a2b6-5e5d17030d6f", "df521750-c02d-4d41-a76b-5e45170cbd5a", "chicken-burger", "Chicken Burger");
Insert Into food_ordering_app.dishes_subtypes Values ("42e52443-aeb2-44ba-8783-bff03f8b711d", "df521750-c02d-4d41-a76b-5e45170cbd5a", "beef-burger", "Beef Burger");
--piza:
Insert Into food_ordering_app.dishes_subtypes Values ("fce0c6c8-76be-4f81-b341-de0233ab3739", "edc6baf5-9b89-444c-9553-07c52c5294ab", "traditional-pizza", "Traditional Pizza");
--cakes:
Insert Into food_ordering_app.dishes_subtypes Values ("5cb37fbe-428c-42c6-9a78-8b11dd0ada78", "b46a380b-32be-4843-bc27-5c25499384d8", "amrican-cake", "American Cakes");
Insert Into food_ordering_app.dishes_subtypes Values ("5268a170-b8f1-4c7c-a386-f8d8df860b63", "b46a380b-32be-4843-bc27-5c25499384d8", "europe-cake", "Europe Cakes");




-- Insert Into dishes Values ("ID", "DISH-TYPE-ID", "DISH-SUBTYPE-ID", "NAME", "DESCRIPTION", "INGREDIENTS", "SIZES", "PRICE", "PHOTOS");
--burgers:
Insert Into food_ordering_app.dishes Values ("da9be417-2041-41d4-8682-b36265a782e6", "df521750-c02d-4d41-a76b-5e45170cbd5a", "c3951d41-34e6-4be1-a2b6-5e5d17030d6f", "Chipotle Cheesy Chicken", "A signature flame-grilled chicken patty topped with smoked beef", '["roll","chicken patty","cheese","lettuce","tomato",]', '["S","M","L",]', '{"S":13.25,"M":15.75,"L":19.9}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("01895eb4-3efa-4bb4-8d7c-04a43d3c7531", "df521750-c02d-4d41-a76b-5e45170cbd5a", "42e52443-aeb2-44ba-8783-bff03f8b711d", "Beef Burger", "A signature flame-grilled chicken patty topped with smoked beef", '["roll","beef patty","cheese","lettuce","pickle"]', '["S","M","L"]', '{"S":10.5,"M":12.4,"L":13.9}', '{ "0":"assets/dishes_photos/"}');
--piza:
Insert Into food_ordering_app.dishes Values ("1314641f-f644-4649-a09c-8b0823ea7e86", "edc6baf5-9b89-444c-9553-07c52c5294ab", "fce0c6c8-76be-4f81-b341-de0233ab3739", "Margherita", "Delicious thin crust with yummy ingredients: tomato sauce, mozzarella, olive oil, basil", '["tomato sauce","mozzarella","olive oil","basil"]', '["S","M","L"]', '{"S":14.1,"M":18.5,"L":22.6}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("6e7e8522-f417-4e0c-afcc-96b94669e9a7", "edc6baf5-9b89-444c-9553-07c52c5294ab", "fce0c6c8-76be-4f81-b341-de0233ab3739", "Capricciosa", "Delicious thin crust with yummy ingredients: tomato sauce, mushrooms, artichokes, garlic, mozzarella, prosciutto ", '["tomato sauce","mozzarella","mushrooms","artichokes","garlic","prosciutto"]', '["S","M","L"]', '{"S":15.5,"M":18.3,"L":24.5}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("3f4e5e51-7d5b-4ad9-b1f4-af119e3b4408", "edc6baf5-9b89-444c-9553-07c52c5294ab", "fce0c6c8-76be-4f81-b341-de0233ab3739", "Vegetariana ", "Delicious thin crust with yummy ingredients: tomato sauce, mozzarella, paprika, tomatoes, cucumber, red onion, corn ", '["tomato sauce","mozzarella","paprika","tomatoes","cucumber","red onion","corn"]', '["S","M","L"]', '{"S":11.5,"M":13.3,"L":15.5}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("7781cfc3-97ee-42e8-adf2-146d4a1d6f6d", "edc6baf5-9b89-444c-9553-07c52c5294ab", "fce0c6c8-76be-4f81-b341-de0233ab3739", "Tuna ", "Delicious thin crust with yummy ingredients: tomato sauce, mozzarella, tuna, black olives, red onion, corn ", '["tomato sauce","mozzarella","tuna","black olives","red onion","corn"]', '["S","M","L"]', '{"S":16.5,"M":18.99,"L":22.99}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("6688d700-5a33-4d95-81a7-33ea5dac8b86", "edc6baf5-9b89-444c-9553-07c52c5294ab", "fce0c6c8-76be-4f81-b341-de0233ab3739", "Peperoni ", "Delicious thin crust with yummy ingredients: tomato sauce, mozzarella, peperoni, red onion, corn ", '["tomato sauce","mozzarella","peperoni","red onion","corn"]', '["S","M","L"]', '{"S":12.99,"M":14.99,"L":17.99}', '{ "0":"assets/dishes_photos/"}');
--cakes:
Insert Into food_ordering_app.dishes Values ("0aa5e35b-9503-4e88-b764-b23cb1be5ab0", "b46a380b-32be-4843-bc27-5c25499384d8", "5cb37fbe-428c-42c6-9a78-8b11dd0ada78", "Apple Pie", "Hand-peeled and hand-sliced crisp apples mixed with cinnamon, nutmeg, and sugar, then placed between two layers of our handmade flaky crust for apple pie perfection.", '["sugar","flour","cinnamon","ginger","nutmeg","apples","lemon juice"]', '["S","M","L"]', '{"S":5.5,"M":7,"L":8.5}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("6b9404af-5048-445d-b872-6248fddcc82d", "b46a380b-32be-4843-bc27-5c25499384d8", "5268a170-b8f1-4c7c-a386-f8d8df860b63", "Carrot Cake", "It's deeply moist and filled with toasted pecans. Most of its flavor comes from brown sugar, cinnamon, ginger, nutmeg, and carrots.", '["grated carrot","flour","cinnamon","allspice","salt","baking powder","baking soda","brown sugar"]', '["S","M","L"]', '{"S":5.5,"M":7,"L":8.5}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("dc67757a-3b7d-419c-9f8a-b9a7dcd03b4d", "b46a380b-32be-4843-bc27-5c25499384d8", "5cb37fbe-428c-42c6-9a78-8b11dd0ada78", "Red Velvet Cake", "This cake is incredibly soft, moist, buttery, and topped with an easy cream cheese frosting. Red velvet is such a unique cake because it has a vanilla flavor but also a hint of chocolate.", '["flour","vanilla","sugar","butter","eggs","baking soda","cocoa powder"]', '["S","M","L"]', '{"S":6.65,"M":9.49,"L":11.55}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("b87fda90-83ed-436c-8ab2-134de439bc0b", "b46a380b-32be-4843-bc27-5c25499384d8", "5cb37fbe-428c-42c6-9a78-8b11dd0ada78", "New York Cheesecake", "New York cheesecake is known for its creamy, satiny texture. It's rich, dense and tall with a flat top. Sometimes it’s flavored with lemon to add freshness, perfect with your morning coffee", '["butter","eggs","egg yolks","cream cheese","sugar","heavy cream"]', '["S","M","L"]', '{"S":4.33,"M":6.22,"L":7.05}', '{ "0":"assets/dishes_photos/"}');
Insert Into food_ordering_app.dishes Values ("caf5781b-3938-48e0-805f-78802c516cbb", "b46a380b-32be-4843-bc27-5c25499384d8", "5cb37fbe-428c-42c6-9a78-8b11dd0ada78", "Coconut Cake", "This perfect coconut cake sets the bar for homemade cakes everywhere. It's supremely moist with a soft fluffy crumb and intense coconut flavor.", '["cake flour","egg whites","sour cream","canned coconut milk","butter","salt"]', '["S","M","L"]', '{"S":3.7,"M":5,"L":6.99}', '{ "0":"assets/dishes_photos/"}');


