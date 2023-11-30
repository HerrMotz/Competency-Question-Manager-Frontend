import { defineStore } from 'pinia'
import { StateT } from './interfaces/State.ts'
import { UserT } from "./interfaces/User.ts";
import LoginDataService from "./services/LoginDataService.ts";
import {UXResponse} from "./interfaces/UXResponse.ts";

export const useStore = defineStore('customers', {
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
        login(email: string, password: string): Promise<boolean | UXResponse> {
            return LoginDataService.login(email, password).then(response => {
                this.user = {
                    email: response.data.email,
                    name: response.data.name,
                    loggedInAt: new Date(),
                    accessToken: response.data.accessToken,
                    sessionValidUntil: new Date(new Date().getDate() + 1)
                }
                return true
            }).catch(reason => {
                console.log("Debug info for error:");
                console.log(reason);

                return {
                    title: "Oops! An error occurred...",
                    text: "... logging in. Debugging info can be found in the console.",
                    detail: reason,
                    messageType: "error"
                }
            })
        }
    }
})