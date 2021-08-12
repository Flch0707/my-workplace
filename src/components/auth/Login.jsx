import React, { useRef, useContext, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { AuthContext } from '../../context/authCtx'
import { Link, useHistory } from 'react-router-dom'
function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const { login, currentUser } = useContext(AuthContext)
    const history = useHistory()


    const handleLogin = async (e, AuthType) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(AuthType, emailRef.current.value,
                passwordRef.current.value)
            setError('')
            setLoading(false)
            history.push('/')
        }
        catch (err) {
            console.log(err)
            setLoading(false)
            setError(err.message)
        }
    }

    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {currentUser && currentUser.email}
                    <Form onSubmit={e => handleLogin(e, "EMAIL")}>
                        <Form.Group id="email">
                            <Form.Label className="mt-3">Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label className="mt-3">Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">Login</Button>
                    </Form>
                    <div className="w_100 text-center mt-3 mb-3 border-top border-bottom">
                        or
                    </div>
                    <Button onClick={e => handleLogin(e, "GOOGLE")} className="w-100 btn-outline text-primary bg-white">
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Login Using Google
                    </Button>
                </Card.Body>
            </Card>
            <div className="w_100 text-center mt-2">
                Do not have an account yet? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    )
}

export default Login
