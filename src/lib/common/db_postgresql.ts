
import type { PoolClient } from "pg";
import pkg from 'pg';
const {Pool} = pkg;

import { SECRET_PGUSER, SECRET_PGPASSWORD, SECRET_PGHOST, SECRET_PGPORT, SECRET_PGDATABASE } from '$env/static/private';

const PostgreSQL = () => {
    
    const api = {
        checkConnection: async (): Promise<PoolClient> => {
            return await (await DBInstance.getInstance()).getContext()
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query: async (sql: string, params: any[] = []): Promise<any> => {
            const dbContext = await (await DBInstance.getInstance()).getContext();
            if(dbContext){

                try{ 
                    //console.log(sql, params);
                    const res = await dbContext.query(sql, params);
                    return res;
                } catch (err) {
                    if (err instanceof Error) {
                        console.log(sql)
                        console.log(params)
                        console.log(err.stack)
                    }
                    throw new Error('There was a problem reading the database')
                }
            } else {
                throw new Error('Database not available')
            }

        },
    }; 
    return api;
};

export default PostgreSQL;


// Singleton pattern - used to connect to the database ONCE throughout the entire life of the app
export class DBInstance {
    private static dbContext: PoolClient;
    private static instance: DBInstance;
    private async initialize() {
        try {
            const pool = new Pool({
                database: SECRET_PGDATABASE,
                host: SECRET_PGHOST,
                user: SECRET_PGUSER,
                password: SECRET_PGPASSWORD,
                port: Number(SECRET_PGPORT),
                idleTimeoutMillis: 15000,
                connectionTimeoutMillis: 5000,
                max: 50
            })
            DBInstance.dbContext = await pool.connect()
        } catch (err) {
            console.log(err)
            throw new Error('Unable to connect to database')
        }
    }
    public static getInstance = async (): Promise<DBInstance> => {
        if (!DBInstance.instance) {
            DBInstance.instance = new DBInstance();
            await DBInstance.instance.initialize()
        }
        return DBInstance.instance;
    };
    public getContext = async (): Promise<PoolClient> => {
        return DBInstance.dbContext;
    }
}