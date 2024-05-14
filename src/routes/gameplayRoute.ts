import express, {Request, Response, Router} from 'express';
import {ConnectionSingleton}                from "../ConnectionSingleton";

export const gameplayRoute: Router = express.Router();

gameplayRoute.post('/gameplay/getCircuitTileById/', (req: Request, res: Response) => {
    console.log('gameplay/getCircuitTileById');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   mapId : "+req.body.circuitIdIn+"\n}");
    const { circuitIdIn } = req.body;

    const sqlQuery: string = "SELECT * FROM circuittile WHERE circuitid = "+ circuitIdIn;
    connection.query(sqlQuery, function (err, result) {
        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                success: 'false'
            })
            return;
        }
        console.log(result);

        const tileSet: any = {
            "circuit" : [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            "rotation" : [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }



        result.forEach((tile: any) => {
            tileSet.circuit[tile.rowindex][tile.columnindex]  = tile.tileid;
            tileSet.rotation[tile.rowindex][tile.columnindex] = tile.orientation;
        })

        const sqlQuery: string = "SELECT laps FROM circuit WHERE circuitid = "+ circuitIdIn;
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                console.log("Sql request failed");
                res.status(400).json({
                    success: 'false'
                })
                return;
            }
            console.log(result);

            const laps: number = result[0].laps;

            res.status(200).json({
                tileSet,
                laps
            })
        });
    });
});


gameplayRoute.post('/gameplay/getOwnKartByPlayerId/', (req: Request, res: Response) => {

    console.log('gameplay/getOwnKartByPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : "+req.body.playerIdIn+"\n}");
    const { playerIdIn } = req.body;

    const sqlQuery: string = "SELECT kartid FROM ownkart WHERE isselected = 1 AND playerid = "+ playerIdIn;
    connection.query(sqlQuery, function (err, result) {

        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                success: 'false'
            })
            return;
        }
        console.log(result);
        res.status(200).json({
            kartId: result[0].kartid
        })
    });
});


gameplayRoute.post('/gameplay/getCircuitInformation/', (req: Request, res: Response) => {
    console.log('gameplay/getCircuitInformation');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   circuitId : "+req.body.circuitIdIn+"\n}");
    const { circuitIdIn } = req.body;

    const sqlQuery : string = "SELECT c.circuitname, c.creatortime, COALESCE(SUM(p.playernote), 0) circuitscore, c.creatorid FROM circuit c, play p WHERE c.circuitid = p.circuitid AND c.circuitid = "+ circuitIdIn +" GROUP BY c.circuitname, c.creatortime, c.creatorid";
    connection.query(sqlQuery, function (err, circuitResults) {

        if (err) {
            console.log("Sql request failed");
            res.status(400);
            return;
        }
        console.log(circuitResults);
        const circuitResult = circuitResults[0];

        const circuitName:  string = circuitResult.circuitname;
        const creatorTime:  number = circuitResult.creatortime;
        const circuitScore: number = circuitResult.circuitscore;
        const creatorId:    number = circuitResult.creatorid;

        const sqlQuery: string = "SELECT username FROM player WHERE playerid = "+ creatorId;
        connection.query(sqlQuery, function (err, creatorResult) {
            if (err) {
                console.log("Sql request failed");
                res.status(400);
                return;
            }
            console.log(creatorResult);

            const creatorUsername = creatorResult[0].username;

            const sqlQuery: string = "SELECT pr.username, p.playertime FROM player pr, play p WHERE pr.playerid = p.playerid AND p.circuitid = "+ circuitIdIn +" ORDER BY p.playertime ASC LIMIT 5";
            connection.query(sqlQuery, function (err, usernameResult) {
                if (err) {
                    console.log("Sql request failed");
                    res.status(400);
                    return;
                }
                console.log(usernameResult);

                const leaderBoard: any[] = [null];
                let i: number = 0;

                usernameResult.forEach((player: any) => {
                    if (player !== null && player.playertime !== null) {
                        leaderBoard[2*i]   = player.username;
                        leaderBoard[2*i+1] = player.playertime;
                        i++;
                    }
                });

                console.log(leaderBoard);

                res.status(200).json({
                    circuitName,
                    circuitScore,
                    creatorUsername,
                    creatorTime,
                    leaderBoard
                });
            });
        });
    });
});

gameplayRoute.post('/gameplay/getBestScoreAndNote/', (req: Request, res: Response) => {
    console.log("gameplay/getBestScoreAndNote");

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : "+req.body.playerIdIn+",\n    circuitId : "+ req.body.circuitIdIn +"\n}");
    const { playerIdIn, circuitIdIn } = req.body;

    const sqlQuery : string = "SELECT playernote, playerscore FROM play WHERE playerid = "+ playerIdIn +" AND circuitid = "+ circuitIdIn;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                success: 'false'
            });
            return;
        }
        console.log(result);

        res.status(200).json({
            playerNote:  result[0].playernote,
            playerScore: result[0].playerscore
        })
    })
});

gameplayRoute.post('/gameplay/addScoreToLeaderBoard/', (req: Request, res: Response) => {
    console.log('gameplay/addScoreToLeaderBoard');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   circuitId : "+req.body.circuitIdIn+", username : \'"+req.body.usernameIn+"\', new score : "+req.body.newScoreIn+"\n}");
    const { circuitIdIn, usernameIn, newScoreIn } = req.body;

    const sqlQuery : string = "SELECT playerid FROM player WHERE username = "+ usernameIn;
    connection.query(sqlQuery, function (err, result) {
        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                error: 'wrong username'
            });
            return;
        }
        console.log(result);

        const playerId: number = result[0].playerid;

        connection.query("DELETE FROM play WHERE playerid = "+ playerId +" AND circuitid = "+ circuitIdIn);
        connection.query("INSERT INTO play(playerid, circuitid, playertime) VALUES("+ playerId +", "+ circuitIdIn +", "+ newScoreIn +")");
        console.log("try to add new score");

        connection.commit(function(err) {
            if (err) {
                console.log("Sql request failed");
                connection.rollback(function () {
                    console.log("Sql rollback failed");
                });
                return;
            }
            console.log("new score added");

            res.status(200).json({
                success: 'true'
            });
            return;
        });
    });
});

gameplayRoute.post('/gameplay/updateBestTimeOfCircuitByPlayerId/', (req: Request, res: Response) => {
    console.log('gameplay/updateBestTimeOfCircuitByPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : " + req.body.playerIdIn + ",\n   circuitId : " + req.body.circuitIdIn + ",\n     newBestTime : " + req.body.newBestTimeIn + "\n}");
    const { playerIdIn, circuitIdIn, newBestTimeIn} = req.body;

    connection.query("DELETE FROM play WHERE playerid = "+ playerIdIn +" AND circuitid = "+ circuitIdIn);
    connection.query("INSERT INTO play VALUES("+ playerIdIn +", "+ circuitIdIn +", "+ newBestTimeIn +", NULL)", (err) => {
        if (err) {
            console.error("Sql request failed");
            res.status(400).json({
                success: "false"
            })
            return;
        }

        connection.commit((err) => {
            if (err) {
                connection.rollback(() => {
                    console.error("Sql rollback failed");
                });
                console.error("Sql request failed");
                res.status(400).json({
                    success: "false"
                });
                return;
            }
            console.log("player's best time updated = {\n   playerId : "+ playerIdIn +",\n   circuitId : "+ circuitIdIn +",\n    newBestTime : "+ newBestTimeIn +"\n}");

            res.status(200).json({
                success: "true"
            });
        });
    });
});

gameplayRoute.post('/gameplay/updateNoteOfCircuitByPlayerId/', (req: Request, res: Response) => {
    console.log('gameplay/updateNoteOfCircuitByPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : " + req.body.playerIdIn + ",\n   circuitId : " + req.body.circuitIdIn + ",\n     newNote : " + req.body.newNoteIn + "\n}");
    const { playerIdIn, circuitIdIn, newNoteIn} = req.body;

    connection.query("UPDATE play SET playernote = "+ newNoteIn +" WHERE playerid = "+ playerIdIn +" AND circuitid = "+ circuitIdIn, (err) => {
        if (err) {
            console.error("Sql request failed");
            res.status(400).json({
                success: "false"
            })
            return;
        }

        connection.commit((err) => {
            if (err) {
                connection.rollback(() => {
                    console.error("Sql rollback failed");
                });
                console.error("Sql request failed");
                res.status(400).json({
                    success: "false"
                });
                return;
            }
            console.log("player's note updated = {\n   playerId : "+ playerIdIn +",\n   circuitId : "+ circuitIdIn +",\n    newNote : "+ newNoteIn +"\n}");

            res.status(200).json({
                success: "true"
            });
        });
    });
});

gameplayRoute.post('/gameplay/addVroumCoinToPlayerId/', (req: Request, res: Response) => {
    console.log('gameplay/addVroumCoinToPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : "+ req.body.playerIdIn +"\n}");
    const { playerIdIn } = req.body;

    const sqlQuery: string = "SELECT vroumcoins FROM player WHERE playerid = "+ playerIdIn;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.error("Sql request failed");
            res.status(400).json({
                success: "false"
            })
            return;
        }
        console.log(result);

        const newVroumCoins: number = result[0].vroumcoins + 1;

        connection.query("UPDATE player SET vroumcoins = "+ newVroumCoins +" WHERE playerid = "+ playerIdIn, (err) => {
            if (err) {
                console.error("Sql request failed");
                res.status(400).json({
                    success: "false"
                })
                return;
            }

            connection.commit((err) => {
                if (err) {
                    connection.rollback(() => {
                        console.error("Sql rollback failed");
                    });
                    console.error("Sql request failed");
                    res.status(400).json({
                        success: "false"
                    });
                    return;
                }
                console.log("VroumCoins added = {\n   playerId : "+ playerIdIn +",\n   newVroumCoins : "+ newVroumCoins +"\n}");

                res.status(200).json({
                    success: "true"
                });
            });
        });
    });
});