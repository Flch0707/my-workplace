import React, { useRef, useContext, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { AuthContext } from '../../contexts/authCtx/context'
import { Link } from 'react-router-dom'
import { ROUTEPATH } from '../../constants/constants'

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const displayNameRef = useRef()
    const { updateProfileInfo, state: { currentUser, error, loading, message } } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProfileInfo({
            email: mailRef.current.value,
            password: passwordRef.current.value,
            passwordConfirm: passwordConfirmRef.current.value,
            displayName: displayNameRef
        })
    }
    //     let pEmail, pProf, pPassword = null
    //     if (passwordConfirmRef.current.value !== passwordRef.current.value) {
    //         setError('Passwords do not match')
    //         setLoading(false)
    //         return
    //     }
    //     if (emailRef.current.value !== currentUser.email) {
    //         pEmail = updateEmail(emailRef.current.value)
    //     }
    //     if (displayNameRef.current.value !== currentUser.displayName) {
    //         pProf = updateProfileInfo(displayNameRef.current.value)
    //     }
    //     if (passwordRef.current.value !== currentUser.password) {
    //         pPassword = updatePassword(passwordRef.current.value)
    //     }
    //     Promise.all([pEmail, pProf, pPassword]).then(() => {
    //         setMessage('Profile updated successfully')
    //     }).catch(err => {
    //         console.log("err", err)
    //         setError(err.message)
    //     }).finally(() => setLoading(false))
    // }

    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    {currentUser && currentUser.email}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label className="mt-3">Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                        </Form.Group>
                        <Form.Group id="userName">
                            <Form.Label className="mt-3">User Name</Form.Label>
                            <Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label className="mt-3">Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label className="mt-3">Password confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w_100 text-center mt-2">
                <Link to={ROUTEPATH.dashboard}>Cancel</Link>
            </div>
        </div>
    )
}

export default UpdateProfile
