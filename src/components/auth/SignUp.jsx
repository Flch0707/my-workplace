import React, { useRef, useContext, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { AuthContext } from '../../context/authCtx'
import { Link, useHistory } from 'react-router-dom'

export default function () {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signUp, currentUser } = useContext(AuthContext)
    const history = useHistory()


    const handleSignUp = async (e, AuthType) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }
        try {
            await signUp(AuthType, emailRef.current.value,
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
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {currentUser && currentUser.email}
                    <Form onSubmit={e => handleSignUp(e, 'EMAIL')}>
                        <Form.Group id="email">
                            <Form.Label className="mt-3">Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label className="mt-3">Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label className="mt-3">Password confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">Sign Up</Button>
                    </Form>
                    <div className="w_100 text-center mt-3 mb-3 border-top border-bottom">
                        or
                    </div>
                    <Button onClick={e => handleSignUp(e, 'GOOGLE')} className="w-100 btn-outline text-primary bg-white">
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google
                    </Button>
                </Card.Body>
            </Card>
            <div className="w_100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}
