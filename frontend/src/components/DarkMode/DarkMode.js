import DarkModeContext from "../../context/darkMode/DarkModeContext"
import {useContext} from "react"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons"
const DarkMode = () => {
    const {mode, toggleMode} = useContext(DarkModeContext)

    return (
        <div className="dark-mode">
            <label className='switch mr-5'>
                <input  
                    type="checkbox"
                    onChange={() => toggleMode()}
                    checked={mode}
                />
                <span className="slider round"></span>
            </label>
            {mode === true ? <FontAwesomeIcon icon={faSun} className="dark-icon" /> : <FontAwesomeIcon icon={faMoon} className="light-icon" />}
            
        </div>
    )
}

export default DarkMode