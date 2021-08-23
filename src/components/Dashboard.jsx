import React, { useContext, useEffect } from 'react'
import { Card, Button, Alert, Image } from 'react-bootstrap'
import { AuthContext } from '../contexts/authCtx/context'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { ROUTEPATH } from '../constants/constants'
import { Profiler } from 'react';
function Dashboard() {
    const { t } = useTranslation();
    const { logout, resetErrorsAndMessages, state: { error, currentUser, loading } } = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        resetErrorsAndMessages()
    }, [])

    const handleSubmit = async () => {
        await logout({
            history: history
        })
    }
    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">{t("profile.title")}</h2>
                    <Image src={currentUser.photoURL} roundedCircle alt="photo user" style={{ width: "50px" }} />
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong>{currentUser.email}
                    <Link to={ROUTEPATH.updateProfile} className="btn btn-primary w-100 mt-3">{t("profile.update")}</Link>

                </Card.Body>
            </Card>
            <Button className="w-100 btn-outline text-primary bg-white border-0 mt-3" disabled={loading} onClick={handleSubmit}>{t("logout.title")}</Button>
        </div>
    )
}

export default Dashboard
