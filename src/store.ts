import { defineStore } from 'pinia'
import { StateT } from './interfaces/State.ts'
import { UserT } from "./interfaces/User.ts";

export const useStore = defineStore('customers', {
    state: (): StateT => ({
        user: {
            username: "",
            loggedInAt: null,
            sessionValidUntil: null,
            accessToken: ""
        },
    }),

    getters: {
        isLoggedIn(state): boolean { return !!state.user.loggedInAt },
        getUsername(state): string { return state.user.username },
        getUser(state): UserT { return state.user },
    }
})