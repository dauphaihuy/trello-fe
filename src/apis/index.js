import authorizeAxiosInstance from '../utils/authorizeAxios'
import { API_ROOT } from '../utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
}
export const updateBoardDetailsAPI = async (boardId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    return response.data
}
export const moveCardToDiffColumnAPI = async (updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
    return response.data
}
//colunmn
export const updateColumnDetailsAPI = async (columnId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}
export const deleteColumnAPI = async (columnId) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
    return response.data
}
export const addNewColumnAPI = async (columnData) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, columnData)
    return response.data
}
export const addNewCardAPI = async (cardData) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, cardData)
    return response.data
}
