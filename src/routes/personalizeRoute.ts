import express, {Request, Response, Router} from 'express';
import {ConnectionSingleton}                from "../ConnectionSingleton";

export const personalizeRoute: Router = express.Router();

personalizeRoute.post('/personalize/getKartsAndCoinsByPlayerId/', (req: Request, res: Response) => {
    console.log('personalize/getKartsAndCoinsByPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : "+ req.body.playerIdIn +"\n}");
    const { playerIdIn } = req.body;

    const sqlQuery: string = "SELECT kartid, isselected FROM ownkart WHERE playerid = " + playerIdIn;
    connection.query(sqlQuery, function (err, result) {

        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                success: "false"
            })
            return;
        }
        console.log(result);

        const resultPrice: number[] = [1, 3, 5, 6, 8, 9 ,10, 12, 12, 24, 42, 99];

        result.forEach((kart: any) => {
            if(kart.isselected === 1){
                resultPrice[kart.kartid-1] = -1;
            } else {
                resultPrice[kart.kartid-1] = 0;
            }
        })

        let vroumCoins: number = 0;

        const sqlQuery: string = "SELECT vroumcoins FROM player WHERE playerid = " + playerIdIn;
        connection.query(sqlQuery, function (err, result) {

            if (err) {
                console.log("Sql request failed");
                res.status(400).json({
                    success: "false"
                })
                return;
            }
            console.log(result);

            vroumCoins = result[0].vroumcoins;

            console.log("res resultPrice: "+ resultPrice +",\n vroumCoins:  "+vroumCoins);
            res.status(200).json({
                resultPrice,
                vroumCoins
            })
        });
    });
});

personalizeRoute.post('/personalize/postKartsAndCoinsInformationOfPlayerId/', (req: Request, res: Response) => {
    console.log('personalize/postKartsAndCoinsInformationOfPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerIdIn : "+ req.body.playerIdIn +",\n   tabInfoIn : "+ req.body.tabInfoIn +",\n   vroumCoinsIn : "+ req.body.vroumCoinsIn +"\n}");
    const { playerIdIn, tabInfoIn, vroumCoinsIn } = req.body;

    const sqlQuery: string = "UPDATE player SET vroumcoins = "+ vroumCoinsIn +" WHERE playerid = "+ playerIdIn;
    connection.query(sqlQuery, function (err) {

        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                success: 'false'
            })
            return;
        }
        console.log("VroumCoins of playerId : "+ playerIdIn +", are now up/down to "+ vroumCoinsIn);

        for (let kartId: number = 1; kartId <= 12; kartId++) {

            if (tabInfoIn[kartId-1] === -1) {

                connection.query("DELETE FROM ownkart WHERE playerid = "+ playerIdIn +" AND kartid = "+ kartId);
                connection.query("INSERT INTO ownkart VALUES("+ playerIdIn +", "+ kartId +", 1)");
                console.log("Value of OwnKart playerId : "+ playerIdIn +", kartId : "+ kartId +" changed by 1");

            } else if (tabInfoIn[kartId-1] === 0){

                connection.query("DELETE FROM ownkart WHERE playerid = "+ playerIdIn +" AND kartid = "+ kartId);
                connection.query("INSERT INTO ownkart VALUES("+ playerIdIn +", "+ kartId +", 0)");
                console.log("Value of OwnKart playerId : "+ playerIdIn+ ", kartId : "+ kartId +" changed by 0");
            } else {
                // console.log("Value of OwnKart playerId : "+playerIdIn+", kartId : "+kartId+" doesn't exist yet");
            }
        }
        connection.commit(function(err) {
            if (err) {
                console.log("Sql request failed");
                connection.rollback(function () {
                    console.log("Sql rollback failed");
                });
                return;
            }

            res.status(200).json({
                success: 'true'
            })
        });
    });
});

personalizeRoute.post('/personalize/updatePPIdOfPlayerId/', (req: Request, res: Response) => {
    console.log('personalize/updatePPIdOfPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : "+ req.body.playerIdIn +",\n   newPPId : "+ req.body.newPPIdIn +"\n}");
    const { playerIdIn, newPPIdIn } = req.body;

    connection.query("UPDATE player SET ppid = "+ newPPIdIn +" WHERE playerid = "+ playerIdIn, (err) => {
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
            console.log("player's PPId updated = {\n    playerId : "+ playerIdIn +",\n    newPPId : "+ newPPIdIn +"\n}");

            res.status(200).json({
                success: "true"
            });
        });
    });
});

personalizeRoute.post('/personalize/updatePlayerUsername/', (req: Request, res: Response) => {
    console.log('personalize/updatePlayerUsername');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : "+ req.body.playerIdIn +",\n     newUsername : "+ req.body.newUsernameIn +"\n}");
    const { playerIdIn, newUsernameIn } = req.body;

    const sqlQuery = "SELECT * FROM player";
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.error("Sql request failed");
            res.status(400).json({
                success: "false"
            })
            return;
        }
        console.log(result);

        let usernameAlreadyExist = "false";

        result.forEach((player: any) => {
            if (player.username === newUsernameIn) {
                usernameAlreadyExist = "true";
            }
        });

        if (usernameAlreadyExist === "false") {

            const sqlQuery = "UPDATE player SET username = '" + newUsernameIn + "\' WHERE playerid = " + playerIdIn;
            connection.query(sqlQuery, (err) => {
                if (err) {
                    console.error("Sql request failed");
                    res.status(400).json({
                        success: "false",
                        usernameAlreadyExist: "false"
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
                            success: "false",
                            usernameAlreadyExist: "false"
                        });
                        return;
                    }
                    console.log("player's username updated = {\n   playerId : " + playerIdIn + ",\n     newUsername : " + newUsernameIn + "\n}");

                    res.status(200).json({
                        success: "true",
                        usernameAlreadyExist: "false"
                    });
                });
            });
        } else {
            console.log("player's username already exist");
            res.status(200).json({
                success: "false",
                usernameAlreadyExist: "true"
            });
        }
    })
});

personalizeRoute.post('/personalize/updatePasswordOfPlayerId/', (req: Request, res: Response) => {
    console.log('personalize/updatePasswordOfPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : "+ req.body.playerIdIn +",\n     newPwd : "+ req.body.newPwdIn +"\n}");
    const { playerIdIn, newPwdIn } = req.body;

    connection.query("UPDATE player SET password = "+ newPwdIn +" WHERE playerid = "+ playerIdIn, (err) => {
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
            console.log("player's password updated = {\n   playerId : "+ playerIdIn +",\n     newUsername : "+ newPwdIn +"\n}");

            res.status(200).json({
                success: "true"
            });
        });
    });
});
