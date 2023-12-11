import http from "./httpCommon";
import authHeader from "./authHeader";
import {AxiosResponse} from "axios";
import {UXResponse} from "../interfaces/UXResponse.ts";

export default class TopicDataService {
    static async getTopic(): Promise<AxiosResponse<any, string[]> | UXResponse> {
      return http.get('/topic', { headers: authHeader() }).then(response => {
          return response;
      }).catch(reason => {
          return {
              title: "Oops! An error occurred...",
              text: "... while retrieving competency questions. Debugging info can be found in the console.",
              detail: reason,
              messageType: "error"
          }
      })
    }
  }
  