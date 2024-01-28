import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

axiosInstance.interceptors.response.use(response => {
    if (response.headers && response.headers['permissions-project-engineer']) {
        response.data.permissionsProjectManager = response.headers['permissions-project-manager'].toLowerCase() === 'true';
        response.data.permissionsProjectEngineer = response.headers['permissions-project-engineer'].toLowerCase() === 'true';
        response.data.permissionsProjectMember = response.headers['permissions-project-member'].toLowerCase() === 'true';
    }
    return response;
}, error => {
    // Handle response error
    return Promise.reject(error);
});

export default axiosInstance;