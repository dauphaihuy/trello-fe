import React, { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { verifyUserAPI } from '../../apis'

function AccountVerifycation() {
    let [searchParams] = useSearchParams()
    const { email, token } = Object.fromEntries([...searchParams])
    const [verified, setVerified] = useState(false)
    //goi api verify
    useEffect(() => {
        if (email && token) {
            verifyUserAPI({ email, token }).then(() => setVerified(true))
        }
    }, [email, token])
    //khong ton tai email || token tra ve trang 404
    if (!email || !token) {
        return <Navigate to={'/404'} />
    }
    //chua verify xong thi loading
    if (verified) {
        return <Loading caption={'Verifying'} />
    }
    return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerifycation