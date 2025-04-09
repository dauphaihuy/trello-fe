import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

// Khoi tao 1 doi tuong axios (authorizedKdisinstance) muc dich de custom và cau hinh chung dự án.
let authorizeAxiosInstance = axios.create()
// Thời gian cho toi da của 1 request: 10 phút
authorizeAxiosInstance.defaults.timeout = 10 * 60 * 1000//mily giay
//withCredentials: cho phep axios tu gui cookie trong moi request len be(phục vụ việc chúng ta sẽ lưu jwt tokens
// (refresh và access ) vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true
//can thiệp vào giữa những interceptor api
// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
    interceptorLoadingElements(true)
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
//can thiep vào giữa nhung response nhận về
// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
    interceptorLoadingElements(false)

    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // mã lỗi ngoài 200 sẽ rơi vào đây

    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
    interceptorLoadingElements(false)

    // Xử lý tập trung phần hiện thị thông báo lỗi trả về từ API ở đây (viết code một lần: Clean Code)
    // console.log error ra sẽ thấy cấu trúc data dân tới message lỗi như dưới đây
    console.log(error)
    let ErrorMessage = error?.message
    if (error?.response?.data?.message) {
        ErrorMessage = error?.response?.data?.message
    }
    // Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token.
    if (!error.response?.status !== 410) {
        toast.error(ErrorMessage)
    }
    return Promise.reject(error)
})
export default authorizeAxiosInstance