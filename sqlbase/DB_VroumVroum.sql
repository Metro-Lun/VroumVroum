-- If tables already exist
DROP TABLE IF EXISTS ownkart;
DROP TABLE IF EXISTS kart;
DROP TABLE IF EXISTS play;
DROP TABLE IF EXISTS bannedips;
DROP TABLE IF EXISTS circuittile;
DROP TABLE IF EXISTS circuit;
DROP TABLE IF EXISTS tile;
DROP TABLE IF EXISTS folder;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS player;


-- Table creation
CREATE TABLE circuit (
   circuitid            INT   NOT NULL,
   creatorid            INT   NOT NULL,
   folderid             INT   NOT NULL,
   circuitname          TEXT  NOT NULL,
   creatortime          FLOAT NOT NULL,
   laps			    INT   NOT NULL,
   PRIMARY KEY (circuitid)
);

CREATE TABLE folder (
   folderID             INT  NOT NULL,
   folderName           TEXT NOT NULL,
   PRIMARY KEY (folderID)
);

CREATE TABLE bannedips (
   banID           	    INT  NOT NULL,
   bannedIP             TEXT NOT NULL,
   reason               TEXT,
   PRIMARY KEY (banID)
);

CREATE TABLE play (
   playerid             INT   NOT NULL,
   circuitid            INT   NOT NULL,
   playertime           INT,
   playernote           INT,
   PRIMARY KEY (playerid, circuitid)
);

CREATE TABLE player (
   playerid             INT  NOT NULL,
   username             TEXT NOT NULL,
   password             TEXT NOT NULL,
   ppid			    INT  NOT NULL,
   vroumcoins           INT  NOT NULL,
   isbanned             BOOL,
   PRIMARY KEY (playerid)
);

CREATE TABLE ownkart (
   playerid             INT  NOT NULL,
   kartid               INT  NOT NULL,
   isselected           BOOL NOT NULL,
   PRIMARY KEY (playerid, kartid)
);

CREATE TABLE follow (
   followerid           INT NOT NULL,
   followedid           INT NOT NULL,
   PRIMARY KEY (followerid, followedid)
);

CREATE TABLE circuittile (
   circuitid            INT NOT NULL,
   tileid               INT NOT NULL,
   rowindex             INT NOT NULL, 
   columnindex          INT NOT NULL, 
   orientation          INT NOT NULL,
   PRIMARY KEY (circuitid, tileid, rowindex, columnindex)
);

CREATE TABLE kart (
   kartid               INT  NOT NULL,
   price                INT  NOT NULL,
   PRIMARY KEY (kartid)
);

ALTER TABLE circuit ADD CONSTRAINT FK_CREATOR FOREIGN KEY (creatorid)
      REFERENCES player (playerid);
      
ALTER TABLE circuit ADD CONSTRAINT FK_FOLDER FOREIGN KEY (folderid)
      REFERENCES folder (folderid);                                              
      

ALTER TABLE play ADD CONSTRAINT FK_PLAY FOREIGN KEY (circuitid)
      REFERENCES circuit (circuitid);
      

ALTER TABLE ownkart ADD CONSTRAINT FK_OWNKART FOREIGN KEY (kartid)
      REFERENCES kart (kartid);
      

ALTER TABLE follow ADD CONSTRAINT FK_FOLLOW FOREIGN KEY (followedid)
      REFERENCES player (playerid);

ALTER TABLE follow ADD CONSTRAINT FK_FOLLOW2 FOREIGN KEY (followerid)
      REFERENCES player (playerid);

ALTER TABLE circuittile ADD CONSTRAINT FK_BE_COMPOSED_OF FOREIGN KEY (circuitid)
      REFERENCES circuit (circuitid);

