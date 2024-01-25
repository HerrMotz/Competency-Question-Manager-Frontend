import http from "./httpCommon";
import authHeader from "./authHeader";
import {AxiosResponse} from "axios";
import {UXResponse} from "../interfaces/UXResponse.ts";

class CompetencyQuestionDataService {
    async getAll(): Promise<AxiosResponse<any, CompetencyQuestionT[]> | UXResponse>  {
        return http.get<CompetencyQuestionT[]>(`/questions/`, { headers: authHeader() }).then(response => {
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

    async getAllForOneGroup(group_uuid: string): Promise<AxiosResponse<any, CompetencyQuestionT[]> | UXResponse>  {
        return http.get<CompetencyQuestionT[]>(`/questions/${group_uuid}`, { headers: authHeader() }).then(response => {
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

    async getAllForOneProject(project_uuid: string): Promise<AxiosResponse<any, CompetencyQuestionT[]> | UXResponse> {
        return http.get<CompetencyQuestionT[]>(`/questions/by_project/${project_uuid}`, {headers: authHeader()}).then(response => {
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

    async getOne(question_uuid: string, group_uuid: string): Promise<AxiosResponse<any, CompetencyQuestionT> | UXResponse> {
        return http.get<CompetencyQuestionT[]>(`/questions/${group_uuid}/${question_uuid}`, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving the competency questions. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async add(question: string, group_uuid: string): Promise<AxiosResponse<any, CompetencyQuestionT> | UXResponse> {
        return http.post<CompetencyQuestionT[]>(`/questions/${group_uuid}`, {
            question: question,
        }, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while adding the competency questions. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async delete(question_uuid: string, group_uuid: string): Promise<AxiosResponse<any, DeleteResponse> | UXResponse> {
        return http.delete<DeleteResponse>(`/questions/${group_uuid}/${question_uuid}`, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while deleting the competency question. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }
}

export default new CompetencyQuestionDataService();