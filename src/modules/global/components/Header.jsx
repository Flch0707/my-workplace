import React, { useContext } from 'react'
import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap'
import { AuthContext } from '../../../contexts/authContext'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { ROUTEPATH } from '../../../constants/constants'
import LanguagePicker from './LanguagePicker';
const Header = () => {
    const { t } = useTranslation();
    const { logout, state: { currentUser } } = useContext(AuthContext)
    const history = useHistory()


    const handleSubmit = async () => {
        await logout({
            history: history
        })
    }

    return (
        <Navbar bg="light" expand="xl">
            <Container>
                <Navbar.Brand as={Link} to={ROUTEPATH.dashboard}>{t("appTitle")}</Navbar.Brand>
                <Nav className="display-end" >
                    <NavDropdown title={<Image src={currentUser && currentUser.photoURL} roundedCircle alt="photo user" style={{ width: "50px" }} />}
                    >
                        <NavDropdown.Item as={Link} to={ROUTEPATH.updateProfile}>{t("profile.title")}</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleSubmit}>{t("logout.title")}</NavDropdown.Item>
                    </NavDropdown>
                    <LanguagePicker />
                </Nav>
            </Container >
        </Navbar >
    )
}
export default Header
