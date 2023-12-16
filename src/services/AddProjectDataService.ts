import http from "./httpCommon";
import authHeader from "./authHeader";
import {AxiosResponse} from "axios";
import {UXResponse} from "../interfaces/UXResponse.ts";



/// API aus Backend steht noch nicht
class AddProjectDataService {
    async getAll(): Promise<AxiosResponse<any, AddProjectX[]> | UXResponse>  {
        return http.get<AddProjectX[]>("/projects", { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving projects. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }
    async getOne(project_id: string): Promise<AxiosResponse<any, AddProjectX> | UXResponse> {
        return http.get<AddProjectX[]>(`/projects/${project_id}`, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving project. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async add(project: string): Promise<AxiosResponse<any, AddProjectX> | UXResponse> {
        return http.post<AddProjectX[]>(`/projects/`, {
            // TODO change this when the backend is ready
            project:
        }, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while adding the project. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }

    async delete(project_id: string): Promise<AxiosResponse<any, DeleteResponse> | UXResponse> {
        return http.delete<DeleteResponse>(`/projects/${project_id}`, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while deleting the project. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }
}

export default new AddProjectDataService();