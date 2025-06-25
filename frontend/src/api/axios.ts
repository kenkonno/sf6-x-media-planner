import {DefaultApiFactory} from "@/api/api";
import axios, {CreateAxiosDefaults} from "axios";
import {Configuration, ConfigurationParameters} from "@/api/configuration";
import {toast} from 'vue3-toastify';

const param: ConfigurationParameters = {}
const configuration = new Configuration(param);
const basePath = ""
const axiosConfig: CreateAxiosDefaults = {
    // baseURL: "https://d1s0zfb8ghpffs.cloudfront.net",
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': '*',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Content-Type': 'text/plain'
        // 何だったんだろうかこれは？・・・・
    },
    withCredentials: true,
}
const axiosInstance = axios.create(axiosConfig)
axiosInstance.interceptors.response.use(response => response, error => {
    switch (error.response?.status) {
        case 401:
            // Handle 401 error
            toast("ログイン情報に誤りがあります。", {autoClose: 1000,})
            break;
        case 409:
            toast("他のユーザーによる更新がありました、この操作は反映されていません。情報をリロードし、再度操作してください。", {autoClose: 10000,})
            break;
        default:
            toast("エラーが発生しました。\n" + error.response?.data, {
                autoClose: 1000,
            })
    }
    return Promise.reject(error)
})
export const Api = DefaultApiFactory(configuration, basePath, axiosInstance)