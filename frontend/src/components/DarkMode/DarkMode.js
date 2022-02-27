import DarkModeContext from "../../context/darkMode/DarkModeContext"
import {useContext} from "react"
const DarkMode = () => {
    const {mode, toggleMode} = useContext(DarkModeContext)

    return (
        <div>
            <label className='switch'>
                <input  
                    type="checkbox"
                    onChange={() => toggleMode()}
                    checked={mode}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default DarkMode