import { useState, useEffect, useContext } from "react"
import axios from "axios"
import DarkModeContext from "../../context/darkMode/DarkModeContext"
import "bootstrap/dist/css/bootstrap.min.css";
import "./bugReportLogs.css"
const BugReportLogs = () => {
    const [bugs, setBugs] = useState([])

    useEffect(() => {
        axios.get("/bugReport")
            .then((res) => {
                setBugs(res.data.bugReportData)
            })
    }, [])
    const { mode, toggleMode } = useContext(DarkModeContext)
    return (<div className={mode === true ? "main dark" : "main"}>
        <div className="table-wrapper container shadow p-3 mt-5 w-75">
        <table className={mode == true ? "table table-striped" : "table"}>
            <thead>
                <tr className="text-danger">
                    <th>#</th>
                    <th>Email</th>
                    <th>Bug Severity</th>
                    <th>Occurance</th>
                    <th>Information</th>
                </tr>
            </thead>
            <tbody>
                {
                    bugs.map((bug, index) =>
                        <tr>
                            <td>{(index+1)}</td>
                            <td>{bug.email}</td>
                            <td>{bug.bugSeverity}</td>
                            <td>{bug.occurance}</td>
                            <td>{bug.information}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>
    </div>)
}

export default BugReportLogs