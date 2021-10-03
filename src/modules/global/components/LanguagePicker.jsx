import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { LANGUAGE } from '../../../constants/constants'
import { FaGlobe } from 'react-icons/fa';
import FlagIcon from '../../icons/FlagIcon'

const LanguagePicker = ({ singleDisplay }) => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language)
    }
    const getCurrentCountryCode = () => {
        const currentLang = LANGUAGE.find(l => l.languageCode === i18n.language)
        return currentLang.countryCode
    }
    return (
        <NavDropdown className={singleDisplay && 'dropDown-singleDisplay'} title={<><FaGlobe fill='pink' size={25} /><FlagIcon className='flag-mini' squared code={getCurrentCountryCode()} /></>} alt="language selector">
            {LANGUAGE.map((lang, i) => {
                return (<NavDropdown.Item
                    disabled={i18n.language === lang.languageCode}
                    as="button"
                    style={{
                        opacity: i18n.language === lang.languageCode ? 0.5 : 1,
                    }}
                    key={i}
                    onClick={() => handleLanguageChange(lang.languageCode)}>
                    {lang && <FlagIcon code={lang.countryCode} />}
                    <span style={{ marginLeft: '10px' }}>{t(`language.${lang.languageCode}`)}</span>
                </NavDropdown.Item>)
            })}
        </NavDropdown>)
}

export default LanguagePicker
