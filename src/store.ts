import { defineStore } from 'pinia'
import { StateT } from './interfaces/State.ts'
import { UserT } from "./interfaces/User.ts";
import LoginDataService from "./services/LoginDataService.ts";
import {UXResponse} from "./interfaces/UXResponse.ts";

export const useStore = defineStore('cq-manager', {
    persist: true,

    state: (): StateT => ({
        user: {
            id: "",
            email: "",
            name: "",
            loggedInAt: null,
            accessToken: "",
            sessionValidUntil: null,
        },
    }),

    getters: {
        isLoggedIn(state): boolean { return !!state.user.loggedInAt },
        getemail(state): string { return state.user.email },
        getUser(state): UserT { return state.user },
    },

    actions: {
        logout() {
            this.user.loggedInAt = null;
        },
        async login(email: string, password: string): Promise<boolean | UXResponse> {
            return LoginDataService.login(email, password).then(response => {
                if ("messageType" in response) {
                    return response
                } else {
                    this.user = {
                        id: response.data.id,
                        email: response.data.email,
                        name: response.data.name,
                        loggedInAt: new Date(),
                        accessToken: response.data.token,
                        sessionValidUntil: new Date(new Date().getDate() + 1)
                    }
                    return true
                }
            })
        }
    }
})