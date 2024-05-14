import express, {Request, Response, Router} from 'express';
import {ConnectionSingleton}                from '../ConnectionSingleton';

export const connectionRoute: Router = express.Router();

connectionRoute.post('/connection/tryToConnect/', (req: Request, res: Response) => {
    console.log('connection/tryToConnect');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   username : \'"+req.body.usernameIn+"\',\n   password : \'"+req.body.passwordIn+"\'\n}");
    const { usernameIn, passwordIn }  = req.body;

    connection.query("SELECT * FROM player", function (err, result) {
        let alreadyRegisterOut: boolean = false;
        let rightPasswordOut:   boolean = false;
        let playerIdOut:        number  = 0;
        let usernameOut:        string  = "";
        let PPIdOut:            number  = 0;

        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                alreadyRegisterOut,
                rightPasswordOut,
                playerIdOut,
                usernameOut,
                PPIdOut
            })
            return;
        }

        let usernameExist: number = 0;

        result.forEach((player: any) => {
            if(player.username === usernameIn){
                alreadyRegisterOut = true;

                if (player.password === passwordIn) {
                    rightPasswordOut = true;
                    usernameOut      = usernameIn;
                    playerIdOut      = player.playerid;
                    PPIdOut          = player.ppid;
                }

                usernameExist = 1;
                res.status(200).json({
                    alreadyRegisterOut,
                    rightPasswordOut,
                    playerIdOut,
                    usernameOut,
                    PPIdOut
                });
                return;
            }
        })

        if (usernameExist === 0) {
            res.status(200).json({
                alreadyRegisterOut,
                rightPasswordOut,
                playerIdOut,
                usernameOut,
                PPIdOut
            });
        }
    });
});


connectionRoute.post('/connection/wantToRegistrate/', (req: Request, res: Response) => {
    console.log('connection/wantToRegistrate');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   nickname : \'"+req.body.nicknameIn+"\',\n   password : \'"+req.body.passwordIn+"\'\n}");
    const { nicknameIn, passwordIn }  = req.body;

    connection.query("SELECT * FROM player", function (err, result) {
        let alreadyRegisterOut : boolean = false;
        let playerIdOut : number         = 0;
        let usernameOut : string         = "";
        let PPIdOut: number = 0;

        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                alreadyRegisterOut,
                playerIdOut,
                usernameOut,
                PPIdOut
            })
            return;
        }

        result.forEach((player: any) => {
            if(player.username === nicknameIn){
                alreadyRegisterOut = true;
            }
        })

        if (alreadyRegisterOut === false) {
            usernameOut = nicknameIn;

            connection.query('SELECT MAX(playerid) from player', function (err, result) {
                if (err) {
                    console.log("Sql request failed");
                    res.status(400).json({
                        alreadyRegisterOut,
                        playerIdOut,
                        usernameOut,
                        PPIdOut
                    })
                    return;
                }
                playerIdOut = result[0]["MAX(playerid)"] + 1;
                PPIdOut     = 0;

                const sqlQuery : string = "INSERT INTO player (playerid, username, password, ppid, vroumcoins, isbanned) VALUES ("+playerIdOut+", '"+nicknameIn+"', '"+passwordIn+"', "+ PPIdOut +", 0, 0)";
                connection.query(sqlQuery, function (err) {
                    if (err) {
                        console.log("Sql request failed");
                        res.status(400).json({
                            alreadyRegisterOut,
                            playerIdOut,
                            usernameOut,
                            PPIdOut
                        })
                        return;
                    }

                    const sqlQuery : string = "INSERT INTO ownkart (playerid, kartid, isselected) VALUES ("+playerIdOut+", 1, 1)";
                    connection.query(sqlQuery, function (err) {
                        if (err) {
                            console.log("Sql request failed");
                            res.status(400).json({
                                alreadyRegisterOut,
                                playerIdOut,
                                usernameOut,
                                PPIdOut
                            })
                            return;
                        }
                        console.log("player added = {\n   playerIdOut : "+playerIdOut+",\n   nicknameIn : \'"+nicknameIn+"\',\n   passwordIn : \'"+passwordIn+"\'\n}");
                        console.log("\nreturn statement = {\n   alreadyRegisterOut : "+alreadyRegisterOut+",\n   playerIdOut : "+playerIdOut+",\n   usernameOut : \'"+usernameOut+"\',\n    PPIdOut : "+
                            PPIdOut +"\n}");


                        connection.commit(function(err) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log("Sql rollback failed");
                                });
                                console.log("Sql request failed");
                                res.status(400).json({
                                })
                                return;
                            }
                            console.log("player added = {\n   playerIdOut : "+playerIdOut+",\n   nicknameIn : \'"+nicknameIn+"\',\n   passwordIn : \'"+passwordIn+"\'\n}");
                            console.log("\nreturn statement = {\n   alreadyRegisterOut : "+alreadyRegisterOut+",\n   playerIdOut : "+playerIdOut+",\n   usernameOut : \'"+usernameOut+"\',\n    PPIdOut : "+
                                PPIdOut +"\n}");

                            res.status(200).json({
                                alreadyRegisterOut,
                                playerIdOut,
                                usernameOut,
                                PPIdOut
                            })
                            return;
                        });
                    });
                });
            });
        } else {
            console.log("Already register");
            res.status(200).json({
                alreadyRegisterOut,
                playerIdOut,
                usernameOut,
                PPIdOut
            })
        }
    });
});

connectionRoute.post('connection/tryToDeleteAccount', (req: Request, res: Response) => {
    console.log('connection/tryToDeleteAccount');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   usernameIn : \'"+req.body.usernameIn+"\'\n}");
    const { usernameIn }  = req.body;

    const sqlQuery: string = "DELETE FROM player, ownkart WHERE playerid = (SELECT playerid FROM player WHERE username = '" + usernameIn + "')";
    connection.query(sqlQuery, function (err) {
        if (err) {
            console.log("Sql request failed");
            res.status(400).json();
            return;
        }
        console.log("Try to delete player = {\n   usernameIn : \'" + usernameIn + "\'\n}");

        connection.commit(function(err) {
            if (err) {
                connection.rollback(function () {
                    console.log("Sql rollback failed");
                });
                console.log("Sql request failed");
                res.status(400).json();
                return;
            }
            console.log("player deleted = {\n   usernameIn : \'" + usernameIn + "\'\n}");

            res.status(200).json({
                success: "true"
            });
            return;
        });
    });
});
