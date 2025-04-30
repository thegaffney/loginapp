// See https://svelte.dev/docs/kit/types#app.d.ts

import type { IUser } from "$lib/interfaces";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: IUser
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
