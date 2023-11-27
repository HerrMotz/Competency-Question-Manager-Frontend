import http from "./httpCommon";
import authHeader from "./authHeader";
import {AxiosResponse} from "axios";

class CompetencyQuestionDataService {
    async getAll(): Promise<AxiosResponse<any, CompetencyQuestionT[]>> {
        return await http.get<CompetencyQuestionT[]>("/questions", { headers: authHeader() });
    }
}

export default new CompetencyQuestionDataService();