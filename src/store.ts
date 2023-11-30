import { defineStore } from 'pinia'
import { StateT } from './interfaces/State.ts'
import { UserT } from "./interfaces/User.ts";
import LoginDataService from "./services/LoginDataService.ts";
import {UXResponse} from "./interfaces/UXResponse.ts";

export const useStore = defineStore('customers', {
    persist: true,

    state: (): StateT => ({
        user: {
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
        login(email: string, password: string): Promise<boolean | UXResponse> {
            return LoginDataService.login(email, password).then(response => {
                this.user = {
                    email: response.data.email,
                    name: response.data.name,
                    loggedInAt: new Date(),
                    accessToken: response.data.token,
                    sessionValidUntil: new Date(new Date().getDate() + 1)
                }
                console.log(response)
                return true
            }).catch(reason => {
                console.log("Debug info for error:");
                console.log(reason);
                if (reason.response.status === 401) {
                    return {
                        title: "Oops! These credentials seem to be invalid...",
                        text: "You may contact your system administrator for a password reset.",
                        detail: reason,
                        messageType: "warning"
                    }
                } else {
                    return {
                        title: "Oops! An error occurred...",
                        text: "... logging in. Debugging info can be found in the console.",
                        detail: reason,
                        messageType: "error"
                    }
                }
            })
        }
    }
})