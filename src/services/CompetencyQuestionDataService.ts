import http from "./httpCommon";
import authHeader from "./authHeader";
import {AxiosResponse} from "axios";
import {UXResponse} from "../interfaces/UXResponse.ts";

class CompetencyQuestionDataService {
    async getAll(): Promise<AxiosResponse<any, CompetencyQuestionT[]> | UXResponse>  {
        return http.get<CompetencyQuestionT[]>("/questions", { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving competency questions. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }
}

export default new CompetencyQuestionDataService();