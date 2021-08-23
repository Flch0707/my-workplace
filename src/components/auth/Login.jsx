import React, { useRef, useContext, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { AuthContext } from '../../contexts/authCtx/context'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { AUTHTYPE, ROUTEPATH } from '../../constants/constants'
function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, resetErrorsAndMessages, state: { error, currentUser, loading } } = useContext(AuthContext)
    const history = useHistory()
    const { t } = useTranslation();

    useEffect(() => {
        resetErrorsAndMessages()
    }, [])

    const handleSubmit = async (e, authType) => {
        e.preventDefault()
        await login({
            authType: authType,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            history: history
        })
    }
    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">{t("login.title")}</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {currentUser && currentUser.email}
                    <Form onSubmit={e => handleSubmit(e, AUTHTYPE.email)}>
                        <Form.Group id="email">
                            <Form.Label className="mt-3">{t("profile.email")}</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label className="mt-3">{t("password.title")}</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">{t("global.continue")}</Button>
                        <div className="w_100 text-center mt-3">
                            <Link to="/reset-password">{t("password.forgot")} </Link>
                        </div>
                    </Form>
                    <div className="w_100 text-center mt-3 mb-3 border-top border-bottom">
                        {t("or")}
                    </div>
                    <Button onClick={e => handleSubmit(e, AUTHTYPE.googleAuth)} className="w-100 btn-outline text-primary bg-white">
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> {t("login.loginWith", { provider: "Google" })}
                    </Button>
                </Card.Body>
            </Card>
            <div className="w_100 text-center mt-2">
                {t("account.noAccountYet")} <Link to={ROUTEPATH.signUp}>{t("signUp.message")}</Link>
            </div>
        </div>
    )
}

export default Login
