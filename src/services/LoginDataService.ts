import http from "./httpCommon";
import {AxiosResponse} from "axios";

class LoginDataService {
    async login(email: string, password: string): Promise<AxiosResponse<any, {
        id: string,
        email: string,
        name: string,
        is_system_admin: boolean,
        is_verified: boolean
    }>> {
        return await http.post<{
            id: string,
            email: string,
            name: string,
            is_system_admin: boolean,
            is_verified: boolean
        }>("/users/login", {
            email: email,
            password: password
        });
    }
}

export default new LoginDataService();