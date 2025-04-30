
// this file runs on EVERY request

import PostgreSQL from '$lib/common/db_postgresql'
import type { IUser } from '$lib/interfaces'
import { json, redirect, type ActionResult } from '@sveltejs/kit'

export async function handle({event, resolve}) {
    //  do something to the request before sending back the response

    // check the session cookie
    const sessionGUID = event.cookies.get('svelte_app_session')
    if(sessionGUID){
        // get user from DB using session
        const sql = `select session.user_id, users.email, session.date_expired
        from data.session
        inner join data.users on users.user_id = session.user_id
        where session.guid_id = $1
        `
        const resp = await PostgreSQL().query(sql, [sessionGUID])
        if(resp.rowCount && resp.rows[0].date_expired > Date.now()){
            const user: IUser = {...resp.rows[0]}
            // Set the locals!
            event.locals.user = user
        }
    }

    if(event.url.pathname.includes('/public')){
        // ignore any pages in a public directory?
    } else if(event.url.pathname.includes('/api') && !event.locals.user){
        // if you have an API endpoint and it needs to be behind a login
        // API endpoint need JSON responses, NOT a redirect
        return json({status:401, message:'Not Authorized'})
    } else if(event.url.pathname !== '/login' && !event.locals.user){
        // if NO session found, and NOT on login page, send to login page

        // check if the action is a form submission, need to send a different response
        // A user might submit a form and be logged out...
        const formSubmission = event.request.headers.get('x-sveltekit-action') === 'true'
        if(formSubmission){
            return new Response(
                JSON.stringify({
                    type: 'redirect',
                    status: 303,
                    location: '/login',
                } satisfies ActionResult)
            )
        } else {
            // normal request that can be redirected
            throw redirect(303, '/login')
        }

       
    }

    return await resolve(event)
}