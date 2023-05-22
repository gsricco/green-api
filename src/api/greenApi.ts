import axios from "axios";
import {API_TOKEN_INSTANCE, ID_INSTANCE, ApiKey} from "../common/enums/apiKey";

const setting = {
    headers: {
        'Content-Type': 'application/json',
    },
}
const instance = axios.create({
    baseURL: ApiKey.HOST,
    ...setting
})

export const greenApi = {
    sendMsg(phone:string, message:string) {
        return instance.post<AuthResponseType>(`/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN_INSTANCE}`, {
            chatId: `${phone}@c.us`,
            message: message
        })
    },
    getAllMsg(phone:string) {
        return instance.post<ResponseMessageType>(`/waInstance${ID_INSTANCE}/getChatHistory/${API_TOKEN_INSTANCE}`, {
            chatId: `${phone}@c.us`,
            count: 100
        })
    },
    getPhotoUser(phone:string) {
        return instance.post<ResponsePhotoType>(`/waInstance${ID_INSTANCE}/getAvatar/${API_TOKEN_INSTANCE}`, {
            chatId: `${phone}@c.us`,
        })
    },
}


type AuthResponseType = {
    idMessage: string
}
type ExtendedTextType = {
    text: string
    description: string
    title: string
    previewType: string
    jpegThumbnail: string
    forwardingScore: null,
    isForwarded: null
}
type SendMessageType = {
    type: string
    idMessage: string
    timestamp: number,
    typeMessage: string
    chatId: string
    textMessage: string
    extendedTextMessage: ExtendedTextType

}
type GetMessageType = {
    type: string
    idMessage: string
    timestamp: number
    typeMessage: string
    chatId: string
    textMessage: string
    senderId: string
    senderName: string
}


export type ResponseMessageType = Array<SendMessageType|GetMessageType>

export type ResponsePhotoType ={
    urlAvatar: string
    existsWhatsapp: boolean
}
