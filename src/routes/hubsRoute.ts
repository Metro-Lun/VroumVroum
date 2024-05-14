import express, {Request, Response, Router} from 'express';
import {ConnectionSingleton}                from "../ConnectionSingleton";

export const hubsRoute: Router = express.Router();

hubsRoute.post('/hubs/getCircuitsNumber/', (req: Request, res: Response) => {
    console.log('hubs/getCircuitsNumber');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   personnalCircuitIn : "+ req.body.personnalCircuitIn +"\n   playerIdIn : "+ req.body.playerIdIn +"\n   circuitNameIn : "+ req.body.circuitNameIn +"\n   creatorUsernameIn : "+ req.body.creatorUsernameIn +"\n}");
    const {personnalCircuitIn, playerIdIn, circuitNameIn, creatorUsernameIn} = req.body;
    let sqlQuery: string;

    let circuitNameFilter:     string = "";
    let creatorUsernameFilter: string = "";

    if (circuitNameIn     !== undefined) {
        circuitNameFilter     = " AND circuitname LIKE \'%"+ circuitNameIn     +"%\'";
    }
    if (creatorUsernameIn !== undefined) {
        creatorUsernameFilter = " AND username LIKE \'%"+    creatorUsernameIn +"%\'";
    }

    if (personnalCircuitIn === "true") {
        sqlQuery = "SELECT count(*) circuitnumber FROM circuit, player WHERE creatorid = playerid AND creatorid = "+ playerIdIn + circuitNameFilter + creatorUsernameFilter;
    } else {
        sqlQuery = "SELECT count(*) circuitnumber FROM circuit, player WHERE creatorid = playerid"                              + circuitNameFilter + creatorUsernameFilter;
    }
    console.log("sqlQuery : " + sqlQuery);

    connection.query(sqlQuery, (err, result) => {

        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                success: "false"
            })
            return;
        }
        console.log(result);

        res.status(200).json({
            result: result[0]
        })
    });
});

hubsRoute.post('/hubs/getCircuits/', (req: Request, res: Response) => {
    console.log('hubs/getCircuits');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {"+
        "\n   personnalCircuitIn : "+ req.body.personnalCircuitIn +","+
        "\n   playerIdIn :         "+ req.body.playerIdIn         +","+
        "\n   pageNumberIn :       "+ req.body.pageNumberIn       +","+
        "\n   circuitsNumberIn :   "+ req.body.circuitsNumberIn   +","+
        "\n   circuitNameIn :      "+ req.body.circuitNameIn      +","+
        "\n   creatorUsernameIn :  "+ req.body.creatorUsernameIn  +
        "\n}");
    const {personnalCircuitIn, playerIdIn, pageNumberIn, circuitsNumberIn, circuitNameIn, creatorUsernameIn} = req.body;

    let circuitNameFilter:     string = "";
    let creatorUsernameFilter: string = "";
    let sqlQuery: string;

    if (circuitNameIn     !== undefined) {
        circuitNameFilter     = " AND c.circuitname LIKE \'%"+ circuitNameIn     +"%\'";
    }
    if (creatorUsernameIn !== undefined) {
        creatorUsernameFilter = " AND p.username LIKE \'%"+    creatorUsernameIn +"%\'";
    }

    let limit: number = 12;
    if (circuitNameIn/12 < pageNumberIn) limit = circuitsNumberIn % 12;

    if (personnalCircuitIn === "true") {
        sqlQuery = "SELECT c.circuitid, c.circuitname, p.username creatorusername "+
            "FROM circuit c, player p "+
            "WHERE c.creatorid = p.playerid AND c.creatorid = "+ playerIdIn + circuitNameFilter + creatorUsernameFilter +" "+
            "ORDER BY (SELECT COALESCE(SUM(p.playernote), 0) circuitscore " +
                        "FROM play p " +
                        "WHERE p.circuitid = c.circuitid " +
                        "GROUP BY c.circuitid) " +
            "DESC "+
            "LIMIT "+ limit +" OFFSET "+ 12*(pageNumberIn - 1);
    } else {
        sqlQuery = "SELECT c.circuitid, c.circuitname, p.username creatorusername "+
            "FROM circuit c, player p "+
            "WHERE c.creatorid = p.playerid"+ circuitNameFilter + creatorUsernameFilter +" "+
            "ORDER BY (SELECT COALESCE(SUM(p.playernote), 0) circuitscore " +
                        "FROM play p " +
                        "WHERE p.circuitid = c.circuitid " +
                        "GROUP BY c.circuitid) " +
            "DESC, p.username ASC "+
            "LIMIT "+ limit +" OFFSET "+ 12*(pageNumberIn - 1);
    }

    console.log("sqlQuery : " + sqlQuery);
    connection.query(sqlQuery, function (err, result) {

        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                success: "false"
            })
            return;
        }
        console.log(result);

        res.status(200).json({
            result
        })
    });
});

hubsRoute.post('/hubs/deleteCircuit/', (req: Request, res: Response) => {
    console.log('hubs/deleteCircuit');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   circuitIdIn : " + req.body.circuitIdIn + "\n}");
    const {circuitIdIn} = req.body;

    const sqlQuery: string = "DELETE FROM circuittile WHERE circuitid = " + circuitIdIn;
    connection.query(sqlQuery, (err) => {
        if (err) {
            console.log("Sql request failed");
            res.status(400).json({
                success: "false"
            })
            return;
        }
        console.log("circuittile of circuit "+ circuitIdIn +" deleted");

        const sqlQuery: string = "DELETE FROM play WHERE circuitid = " + circuitIdIn;
        connection.query(sqlQuery, (err) => {
            if (err) {
                console.log("Sql request failed");
                res.status(400).json({
                    success: "false"
                })
                return;
            }
            console.log("play of circuit "+ circuitIdIn +" deleted");

            const sqlQuery: string = "DELETE FROM circuit WHERE circuitid = " + circuitIdIn;
            connection.query(sqlQuery, (err) => {
                if (err) {
                    console.log("Sql request failed");
                    res.status(400).json({
                        success: "false"
                    })
                    return;
                }

                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            console.log("Sql rollback failed : " + err);
                        });
                        console.log("Sql request failed : " + err);
                        res.status(400).json();
                        return;
                    }
                    console.log("circuit deleted = {\n   circuitId : "+ circuitIdIn +"\n}");

                    res.status(200).json({
                        success: "true"
                    });
                });
            });
        });
    })
});