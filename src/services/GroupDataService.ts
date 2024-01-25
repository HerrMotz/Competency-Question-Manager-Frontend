import http from "./httpCommon";
import authHeader from "./authHeader";
import { AxiosResponse } from "axios";
import { UXResponse } from "../interfaces/UXResponse.ts";


class GroupDataService {

    async update(group_id: string, updateData: { name?: string, members?: string[] }): Promise<AxiosResponse<any, GroupT> | UXResponse> {
        return http.put<GroupT>(`/groups/${group_id}`, updateData, { headers: authHeader() })
            .then(response => {
                return response;
            }).catch(reason => {
                return {
                    title: "Oops! An error occurred...",
                    text: "... while updating the group. Debugging info can be found in the console.",
                    detail: reason,
                    messageType: "error"
                };
            });
    }
    
    async addMembers(group_id: string, members: string[]): Promise<AxiosResponse<any, GroupT> | UXResponse> {
        return http.put<GroupT>(`/groups/${group_id}/members/add`, { emails: members }, { headers: authHeader() })
            .then(response => {
                return response;
            }).catch(reason => {
                return {
                    title: "Oops! An error occurred...",
                    text: "... while adding members to the group. Debugging info can be found in the console.",
                    detail: reason,
                    messageType: "error"
                };
            });
    }
    
    async removeMembers(group_id: string, memberIds: string[]): Promise<AxiosResponse<any, GroupT> | UXResponse> {
        return http.put<GroupT>(`/groups/${group_id}/members/remove`, { ids: memberIds }, { headers: authHeader() })
            .then(response => {
                return response;
            }).catch(reason => {
                return {
                    title: "Oops! An error occurred...",
                    text: "... while removing members from the group. Debugging info can be found in the console.",
                    detail: reason,
                    messageType: "error"
                };
            });
    }

    async getAll(): Promise<AxiosResponse<any, GroupT[]> | UXResponse>  {
        return http.get<GroupT[]>(`/groups/`, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving groups. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }

    async getAllForOneProject(project_uuid: string): Promise<AxiosResponse<any, GroupT[]> | UXResponse>  {
        return http.get<GroupT[]>(`/groups/${project_uuid}`, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving groups. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }

    async getOne(group_id: string): Promise<AxiosResponse<any, GroupT> | UXResponse> {
        return http.get<GroupT>(`/groups/${group_id}`, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while retrieving group. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }

    async add(add: { name: string, members: string[] }): Promise<AxiosResponse<any, GroupT> | UXResponse> {
        return http.post<GroupT>(`/groups/`, {
            name: add.name,
            members: add.members
        }, { headers: authHeader() }).then(response => {
            return response;
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while adding the group. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            };
        });
    }

    async delete(group_id: string): Promise<AxiosResponse<any, DeleteResponse> | UXResponse> {
        return http.delete<DeleteResponse>(`/groups/${group_id}`, { headers: authHeader() }).then(response => {
            return response
        }).catch(reason => {
            return {
                title: "Oops! An error occurred...",
                text: "... while deleting the group. Debugging info can be found in the console.",
                detail: reason,
                messageType: "error"
            }
        });
    }
}

export default new GroupDataService();