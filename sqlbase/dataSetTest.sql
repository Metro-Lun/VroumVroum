-- data insertion for test
INSERT INTO folder (folderid, foldername) VALUES
(1, 'Folder 1'),
(2, 'Folder 2'),
(3, 'Folder 3');

INSERT INTO bannedips (banid, bannedip, reason) VALUES
(3, '172.16.0.5', 'Violating terms');

INSERT INTO player (playerid, username, password, ppid, vroumcoins, isbanned) VALUES
(0, 'anonymous', '', 120, 0, FALSE),
(1, 'user1', 'password1111', 0, 100, FALSE),
(2, 'user2', 'password2222', 1, 50, FALSE),
(3, 'user3', 'password3333', 2, 75, TRUE),
(4, 'izuraka', '444444444444', 59, 4, FALSE);

INSERT INTO kart (kartid, price) VALUES
(1, 0),
(2, 3),
(3, 5),
(4, 6),
(5, 8),
(6, 9),
(7, 10),
(8, 12),
(9, 12),
(10, 24),
(11, 42),
(12, 99);

INSERT INTO circuit (circuitid, creatorid, folderid, circuitname, creatortime, laps) VALUES
(1, 1, 1, 'Circuit 1', 12500, 1),
(2, 2, 2, 'Circuit 2', 10800, 2),
(3, 3, 1, 'Circuit 3', 15200, 3);

INSERT INTO play (playerid, circuitid, playertime, playernote) VALUES 
(0, 1, NULL, NULL),
(0, 2, NULL, NULL),
(0, 3, NULL, NULL),
(1, 1, 12568, 1),
(4, 1, 8882, 1),
(2, 1, 42478, 1);

INSERT INTO circuittile (circuitid, tileid, rowindex, columnindex, orientation) VALUES
(1, 3, 1, 2, 0),
(1, 16, 1, 9, 90),
(1, 3, 3, 3, 0),
(1, 3, 3, 5, 90),
(1, 3, 4, 8, 0),
(1, 3, 4, 9, 180),
(1, 16, 5, 2, 270),
(1, 3, 5, 3, 180),
(1, 3, 6, 5, 270),
(1, 16, 6, 8, 180),
(1, 5, 1, 3, 0),
(1, 18, 1, 4, 0),
(1, 5, 1, 5, 0),
(1, 5, 1, 6, 0),
(1, 5, 1, 8, 0),
(1, 5, 2, 2, 90),
(1, 5, 2, 9, 90),
(1, 5, 3, 2, 90),
(1, 5, 3, 4, 0),
(1, 5, 3, 9, 90),
(1, 5, 4, 2, 90),
(1, 5, 4, 3, 90),
(1, 5, 4, 5, 90),
(1, 5, 5, 5, 90),
(1, 5, 5, 8, 90),
(1, 5, 6, 6, 0),
(1, 5, 6, 7, 0),
(1, 7, 1, 7, 90),
(2, 1, 2, 1, 270),
(2, 2, 2, 0, 0),
(2, 3, 1, 1, 90);

INSERT INTO ownkart (playerid, kartid, isselected) VALUES
(0, 1, TRUE),
(1, 1, TRUE),
(1, 2, FALSE),
(2, 1, TRUE),
(3, 1, TRUE),
(3, 2, FALSE);
