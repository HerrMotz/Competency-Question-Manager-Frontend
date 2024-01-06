import http from "./httpCommon";
import authHeader from "./authHeader";
import { AxiosResponse } from "axios";
import { UXResponse } from "../interfaces/UXResponse.ts";

class GroupDataService {
    async getAll(): Promise<AxiosResponse<any, AddGroupT[]> | UXResponse>  {
        return http.get<AddGroupT[]>("/groups", { headers: authHeader() }).then(response => {
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

    async getOne(group_id: string): Promise<AxiosResponse<any, AddGroupT> | UXResponse> {
        return http.get<AddGroupT>(`/groups/${group_id}`, { headers: authHeader() }).then(response => {
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

    async add(add: { groupName: string, groupMember: string[] }): Promise<AxiosResponse<any, AddGroupT> | UXResponse> {
        return http.post<AddGroupT>(`/groups/`, {
            groupName: add.groupName,
            groupMember: add.groupMember
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