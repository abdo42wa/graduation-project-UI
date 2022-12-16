import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getUserToken } from '../reducers/userSlice'
import { useAppDispatch, useAppSelector } from '../store'

const EmailVerify = () => {
    const dispatch = useAppDispatch()
    const location = useLocation();
    const param = useParams();
    const { success, error } = useAppSelector(state => state.user)
    const info = {
        _id: param.id,
        token: param.token
    }
    useEffect(() => {
        console.log(info)
        dispatch(getUserToken(info))
    }, [])
    return (
        <>
            {success ? (
                <p>You have vitrified your account successfully</p>

            ) : (
                <p>404 Invalid link</p>
            )}



        </>
    )
}

export default EmailVerify