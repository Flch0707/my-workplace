import React, { useRef, useContext, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { AuthContext } from '../../contexts/authCtx/context'
import { Link } from 'react-router-dom'
import { ROUTEPATH } from '../../constants/constants'
import { useTranslation } from 'react-i18next';

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const displayNameRef = useRef()
    const { updateProfileInfo, resetErrorsAndMessages, state: { currentUser, error, loading, message } } = useContext(AuthContext)
    const { t } = useTranslation();

    useEffect(() => {
        resetErrorsAndMessages()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProfileInfo({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConfirm: passwordConfirmRef.current.value,
            displayName: displayNameRef.current.value
        })
    }

    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">{t("profile.update")}</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label className="mt-3">{t("profile.email")}</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                        </Form.Group>
                        <Form.Group id="userName">
                            <Form.Label className="mt-3">{t("profile.userName")}</Form.Label>
                            <Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label className="mt-3">{t("password.title")}</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label className="mt-3">{t("password.confirm")}</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">{t("global.update")}</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w_100 text-center mt-2">
                <Link to={ROUTEPATH.dashboard}>{t("global.cancel")}</Link>
            </div>
        </div>
    )
}

export default UpdateProfile
