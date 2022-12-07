
import axios from "axios";
import { errorToast } from "../components/toastMessage/toastMessage";

export function init() {
    axios.interceptors.request.use((request) => {
        const token = localStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        request.headers = headers;
        return request;
    },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use((res) => res, (error) => {
        const res = error.response;
        if (res?.status === 401 && res?.data?.error === "Session is invalid or expired") {
            errorToast(res?.statusText);
            setTimeout(() => {
                window.location.href = "/login";
                localStorage.clear();
            }, 1000);
        }
        if (
                error.request.responseType === "blob" &&
                error.response.data instanceof Blob &&
                error.response.data.type &&
                error.response.data.type.toLowerCase().indexOf("json") != -1
            ) {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.onload = () => {
                        error.response.data = JSON.parse(reader.result);
                        resolve(Promise.reject(error));
                    };
    
                    reader.onerror = () => {
                        reject(error);
                    };
    
                    reader.readAsText(error.response.data);
                });
            }
            return Promise.reject(error);
    })
}
