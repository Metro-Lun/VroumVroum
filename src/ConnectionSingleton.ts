import mysql, {Connection, Pool} from "mysql";
import dotenv from "dotenv";

export class ConnectionSingleton {

    private static connection: Connection = null;

    private constructor() {
        dotenv.config();

        ConnectionSingleton.connection = mysql.createConnection({
            host     : process.env.BACK_HOST,
            user     : process.env.BACK_USER,
            password : process.env.BACK_PWD,
            database : process.env.BACK_DBNAME
        });
    }

    public static getConnection() {

        if (ConnectionSingleton.connection === null) {
            const unused: ConnectionSingleton = new ConnectionSingleton();
        }

        return ConnectionSingleton.connection;
    }
}