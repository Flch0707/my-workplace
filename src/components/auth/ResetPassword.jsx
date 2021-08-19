import React, { useRef, useContext } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { ROUTEPATH } from '../../constants/constants'
import { AuthContext } from '../../contexts/authCtx/context'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    const emailRef = useRef()
    const { resetPassword, state: { message, error, loading } } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        await resetPassword(emailRef.current.value)
    }

    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label className="mt-3">Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">Reset</Button>
                        <div className="w_100 text-center mt-3">
                            <Link to={ROUTEPATH.login}>Login</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w_100 text-center mt-2">
                Do not have an account yet? <Link to={ROUTEPATH.signUp}>Sign up</Link>
            </div>
        </div>
    )
}

export default ResetPassword
