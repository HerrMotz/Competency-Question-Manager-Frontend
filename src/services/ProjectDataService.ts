import http from "./httpCommon";
import authHeader from "./authHeader";
import { AxiosResponse } from "axios";
import { UXResponse } from "../interfaces/UXResponse.ts";

class ProjectDataService {

    async updateManagers(project_id: string, emails: string[]): Promise<AxiosResponse<any, AddProjectT> | UXResponse> {
        return http.put<AddProjectT>(`/projects/${project_id}/managers`, {
            emails: emails
        }, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while updating managers. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }
    
    async updateEngineers(project_id: string, emails: string[]): Promise<AxiosResponse<any, AddProjectT> | UXResponse> {
        return http.put<AddProjectT>(`/projects/${project_id}/engineers`, {
            emails: emails
        }, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while updating engineers. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }
    
    async removeManagers(project_id: string, ids: string[]): Promise<AxiosResponse<any, AddProjectT> | UXResponse> {
        return http.put<AddProjectT>(`/projects/${project_id}/remove_managers`, {
            ids: ids
        }, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while removing managers. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }
    
    async removeEngineers(project_id: string, ids: string[]): Promise<AxiosResponse<any, AddProjectT> | UXResponse> {
        return http.put<AddProjectT>(`/projects/${project_id}/remove_engineers`, {
            ids: ids
        }, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while removing engineers. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }
      
    async getAll(): Promise<AxiosResponse<any, AddProjectT[]> | UXResponse>  {
        return http.get<AddProjectT[]>("/projects/", { headers: authHeader() }).then(response => {
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

    async add(add: { name: string, managers: string[], engineers: string[] }): Promise<AxiosResponse<any, AddProjectT> | UXResponse> {
        return http.post<AddProjectT>(`/projects/`, {
            name: add.name,
            managers: add.managers,
            engineers: add.engineers
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