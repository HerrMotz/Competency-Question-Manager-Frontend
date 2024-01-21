import http from "./httpCommon";
import authHeader from "./authHeader";
import {AxiosResponse} from "axios";
import {UXResponse} from "../interfaces/UXResponse.ts";

class ConsolidationDataService {
    async getAll(): Promise<AxiosResponse<any, ConsolidationT[]> | UXResponse> {
        return http.get<ConsolidationT[]>(`/consolidations/`, {headers: authHeader()}).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving all consolidations. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async getOne(question_uuid: string): Promise<AxiosResponse<any, ConsolidationT> | UXResponse> {
        return http.get<ConsolidationT>(`/consolidations/${question_uuid}`, {headers: authHeader()}).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving this consolidation. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async add(name: string, question_uuids: string): Promise<AxiosResponse<any, ConsolidationT> | UXResponse> {
        return http.post<ConsolidationT>(`/consolidations`,  {
                name: name,
                ids: question_uuids,
            }, {headers: authHeader()}).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while adding a consolidation. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async delete(uuid: string): Promise<AxiosResponse<any, DeleteResponse> | UXResponse> {
        return http.delete<DeleteResponse>(`/consolidations/${uuid}`, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while deleting the consolidation. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async addQuestions(consolidation_uuid: string, question_uuids: string[]): Promise<AxiosResponse<any, DeleteResponse> | UXResponse> {
        return http.put<DeleteResponse>(`/consolidations/${consolidation_uuid}/questions/add`, {ids: question_uuids}, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while adding a question to this consolidation. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async removeQuestions(consolidation_uuid: string, question_uuids: string[]): Promise<AxiosResponse<any, DeleteResponse> | UXResponse> {
        return http.put<DeleteResponse>(`/consolidations/${consolidation_uuid}/questions/remove`, {ids: question_uuids}, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while removing a question from this consolidation. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }
}

export default new ConsolidationDataService();