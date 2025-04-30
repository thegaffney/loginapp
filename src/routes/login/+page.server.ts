import PostgreSQL from "$lib/common/db_postgresql";
import type { ISession, IUser } from "$lib/interfaces";
import { fail, type Action, type Actions } from "@sveltejs/kit";

const login: Action = async ({request, cookies}) => {
    // get the form data
    const data = await request.formData()

    const email = data.get('email')
    const password = data.get('password')

    // Make sure we have the proper fields sent in
    if(
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email ||
        !password
    ) {
        return fail(400, {message: 'Please provide your email and password'})
    }

    // check password in database

    const sql = ` select * from data.users where lower(email) = lower($1) and hash_password = crypt($2, hash_password) `
    const resp = await PostgreSQL().query(sql, [email, password])

    // if no rows are found, then the email and PW combo was not found
    if(resp.rowCount === 0){
        return fail(400, {message:'Your email or password is incorrect'})
    }

    // convert DB row to JS Object...
    const user: IUser = {...resp.rows[0]}

    // create session and get session GUID
    const sessionSQL = `insert into data.session(user_id, date_expired) values ($1, now() + ('8 hour')::interval) returning guid_id `
    const sessionResp = await PostgreSQL().query(sessionSQL, [user.user_id])

    const session: ISession = {...sessionResp.rows[0]}

    // set cookie in browser with session GUID

    cookies.set('svelte_app_session', session.guid_id, {
        path: '/', // every page
        maxAge: 60 * 60 * 8 // 8 hours
    })

    return {
        success: true,
    }
}

export const actions: Actions = {login}