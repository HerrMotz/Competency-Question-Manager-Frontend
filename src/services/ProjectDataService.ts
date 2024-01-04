import http from "./httpCommon";
import authHeader from "./authHeader";
import { AxiosResponse } from "axios";
import { UXResponse } from "../interfaces/UXResponse.ts";

class ProjectDataService {
    async getAll(): Promise<AxiosResponse<any, AddProjectT[]> | UXResponse>  {
        return http.get<AddProjectT[]>("/projects", { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving projects. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }

    async getOne(project_id: string): Promise<AxiosResponse<any, AddProjectT> | UXResponse> {
        return http.get<AddProjectT>(`/projects/${project_id}`, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving project. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }

    async add(add: { projectName: string, projectManager: string[] }): Promise<AxiosResponse<any, AddProjectT> | UXResponse> {
        return http.post<AddProjectT>(`/projects/`, {
            projectName: add.projectName,
            projectManager: add.projectManager
        }, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while adding the project. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
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

export default new ProjectDataService();