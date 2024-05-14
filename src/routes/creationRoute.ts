import express, {Request, Response, Router} from 'express';
import {ConnectionSingleton}                from "../ConnectionSingleton";

export const creationRoute: Router = express.Router();

creationRoute.post('/creation/postCircuitOfPlayerId/', (req: Request, res: Response) => {
    console.log('creation/postCircuitOfPlayerId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   playerId : " + req.body.playerIdIn + "\n,    matrix : "+ req.body.matrixIn +",\n     circuitName : \'"+ req.body.circuitNameIn +"\'\n,     creatorTime : "+ req.body.creatorTimeIn +"\n,     circuitLaps : "+ req.body.circuitLapsIn +"\n}");
    const {playerIdIn, matrixIn, circuitNameIn, creatorTimeIn, circuitLapsIn} = req.body;

    const tilesIdMatrix  = matrixIn[0];
    const rotationMatrix = matrixIn[1];

    console.log("tilesIdMatrix : "+ tilesIdMatrix +"\nrotationMatrix : "+ rotationMatrix);

    connection.query('SELECT MAX(circuitid) maxcircuitid FROM circuit', (err, result) => {
        if (err) {
            console.log("Sql request failed : " + err);
            res.status(400).json({
                success: "false"
            })
            return;
        }
        const circuitIdOut = result[0].maxcircuitid + 1;

        const folderId: number = 1;
        const sqlQuery: string = "INSERT INTO circuit VALUES("+ circuitIdOut +", "+ playerIdIn +", "+ folderId +", \'"+ circuitNameIn +"\', "+ creatorTimeIn +", "+ circuitLapsIn +")";
        connection.query(sqlQuery, (err) => {
            if (err) {
                console.log("Sql request failed : " + err);
                res.status(400).json({
                    success: "false"
                })
                return;
            }

            console.log(tilesIdMatrix)
            console.log(rotationMatrix)

            for (let currentRowId: number = 0; currentRowId < 8; currentRowId++) {
                for (let currentColumnId: number = 0; currentColumnId < 12; currentColumnId++) {

                    connection.query("DELETE FROM circuittile WHERE circuitid = "+ circuitIdOut +" AND rowindex = "+ currentRowId +" AND columnindex = "+ currentColumnId);

                    console.log(tilesIdMatrix[12*currentRowId + currentColumnId] +" ?!= 1");
                    if (tilesIdMatrix[12*currentRowId + currentColumnId] !== 1) {
                        connection.query("INSERT INTO circuittile VALUES("+ circuitIdOut +", "+ tilesIdMatrix[12*currentRowId + currentColumnId] +", "+ currentRowId +", "+ currentColumnId +", "+ rotationMatrix[12*currentRowId + currentColumnId] +")");
                    }
                }
            }

            connection.query("INSERT INTO play(playerid, circuitid) VALUES(0, "+ circuitIdOut +")");

            connection.commit((err) => {
                if (err) {
                    connection.rollback(() => {
                        console.log("Sql rollback failed : " + err);
                    });
                    console.log("Sql request failed : " + err);
                    res.status(400).json();
                    return;
                }
                console.log("circuit added = {\n   circuitId : "+ circuitIdOut +",\n   circuitName : \'"+ circuitNameIn +"\'\n,     creatorTime : "+ creatorTimeIn +",\n   circuitLaps : "+ circuitLapsIn +"\n}");

                res.status(200).json({
                    success: "true"
                });
            });
        });
    });
});

creationRoute.post('/creation/updateLapsOfCircuitId/', (req: Request, res: Response) => {
    console.log('creation/updateLapsOfCircuitId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   circuitId : " + req.body.circuitIdIn + ",\n     newCircuitLaps : " + req.body.newCircuitLapsIn + "\n}");
    const { circuitIdIn, newCircuitLapsIn} = req.body;

    connection.query('UPDATE circuit SET laps = '+ newCircuitLapsIn +' WHERE circuitid = '+ circuitIdIn, (err) => {
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
            console.log("circuit's laps updated = {\n   circuitId : "+ circuitIdIn +",\n    newCircuitLaps : "+ newCircuitLapsIn +"\n}");

            res.status(200).json({
                success: "true"
            });
        });
    });
});

creationRoute.post('/creation/updateNameOfCircuitId/', (req: Request, res: Response) => {
    console.log('creation/updateNameOfCircuitId');

    const connection = ConnectionSingleton.getConnection();

    console.log("request's body = {\n   circuitId : " + req.body.circuitIdIn + ",\n     newCircuitName : \'" + req.body.newCircuitNameIn + "\'\n}");
    const { circuitIdIn, newCircuitNameIn} = req.body;

    connection.query("UPDATE circuit SET circuitname = '"+ newCircuitNameIn +"' WHERE circuitid = "+ circuitIdIn, (err) => {
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
            console.log("circuit's name updated = {\n   circuitId : "+ circuitIdIn +",\n    newCircuitName : \'"+ newCircuitNameIn +"\'\n}");

            res.status(200).json({
                success: "true"
            });
        });
    });
});