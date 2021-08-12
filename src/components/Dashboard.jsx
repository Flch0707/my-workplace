import React, { useContext, useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { AuthContext } from '../context/authCtx'
import { Link, useHistory } from 'react-router-dom'
function Dashboard() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { logout, currentUser } = useContext(AuthContext)
    const history = useHistory()

    const handleLogout = async () => {
        setError('')
        setLoading(true)
        try {
            await logout()
            setLoading(false)
            history.push('/login')
        }
        catch (err) {
            console.log(err)
            setLoading(false)
            setError("Failed to logout")
        }
    }
    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong>{currentUser && currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <Button className="w-100 btn-outline text-primary bg-white border-0 mt-3" disabled={loading} onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Dashboard
