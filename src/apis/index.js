import axios from "axios"
import { API_ROOT } from "../utils/constants"

export const fetchBoardDetailsAPI = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
}
export const updateBoardDetailsAPI = async (boardId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    return response.data
}
export const moveCardToDiffColumnAPI = async (updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
    return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}
export const addNewColumnAPI = async (columnData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns`, columnData)
    return response.data
}
export const addNewCardAPI = async (cardData) => {
    const response = await axios.post(`${API_ROOT}/v1/cards`, cardData)
    return response.data
}
