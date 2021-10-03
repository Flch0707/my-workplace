import React from 'react'
import LanguagePicker from '../../global/components/LanguagePicker'
import { Link } from 'react-router-dom'

const AuthFooter = ({ message, linkTo, label }) => {
    return (
        <div className="w_100 text-center mt-2">
            {message} <Link to={linkTo}>{label}</Link>
            <LanguagePicker />
        </div>
    )
}

export default AuthFooter
