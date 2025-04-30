import PostgreSQL from "$lib/common/db_postgresql";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies}) =>{
    const sessionGUID = cookies.get('svelte_app_session')
    if(sessionGUID){
        const sql = `update data.session set date_expired = now() where guid_id = $1`
        await PostgreSQL().query(sql, [sessionGUID])
    }
    // cookie settings NEED to be the same when creating and deleting
    cookies.delete('svelte_app_session', {
        path: '/', // every page
        maxAge: 60 * 60 * 8 // 8 hours
    })

    throw redirect(303, '/login')
}