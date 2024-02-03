import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

axiosInstance.interceptors.response.use(response => {
    if (response.headers) {
        console.log("headers", response.headers)
        response.data.permissionsGroupMember = response.headers['permissions-group-member'] === 'True';
        response.data.permissionsProjectManager = response.headers['permissions-project-manager'] === 'True';
        response.data.permissionsProjectEngineer = response.headers['permissions-project-engineer'] === 'True';
        response.data.permissionsProjectMember = response.headers['permissions-project-member'] === 'True';
    }
    return response;
}, error => {
    // Handle response error
    return Promise.reject(error);
});

export default axiosInstance;