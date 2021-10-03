import React, { useRef, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../contexts/authContext'
import { ROUTEPATH } from '../../../constants/constants'

import { Form, Button, Card, Alert } from 'react-bootstrap'
import AuthFooter from './AuthFooter'

const ResetPassword = () => {
    const emailRef = useRef()
    const { resetPassword, resetErrorsAndMessages, state: { message, error, loading } } = useContext(AuthContext)
    const { t } = useTranslation();

    useEffect(() => {
        resetErrorsAndMessages()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        await resetPassword(emailRef.current.value)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">{t("password.reset")}</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label className="mt-3">{t("profile.email")}</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">{t("global.reset")}</Button>
                        <div className="w_100 text-center mt-3">
                            <Link to={ROUTEPATH.login}>{t("login.title")}</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <AuthFooter
                message={t("account.noAccountYet")}
                linkTo={ROUTEPATH.signUp}
                label={t("signUp.message")}
            ></AuthFooter>
        </>
    )
}

export default ResetPassword
