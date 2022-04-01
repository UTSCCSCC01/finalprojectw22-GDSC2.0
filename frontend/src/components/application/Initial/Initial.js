import React,{useState,useEffect,} from "react";
import "./Initial.css";
// import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
// import Button from "../common/Button";
import axios from "axios";

const Initial = () => {
  const params= useParams();
  var [status, setStatus] = useState({});
  const student_num = params.id;
  const getStatus = ()=>{
    console.log(student_num)
    axios.post("/applications/status",{'student_num':student_num})
    .then((res)=>{
        setStatus({
          name: res.data.name,
          student: res.data.student,
          mentor: res.data.mentor
        })
    }).catch((e)=>{
        alert(e)
    })
  }
  useEffect(()=>{
    getStatus();
  },[])
  return (
    <div className = 'bg_img'>
      <style type="text/css">
        {`
    .btn-large {
      padding: 10px 20px 10px 20px;
      font-size: 2.5vw;
    }
    
    `}
      </style>
      <div className="bg">
        <div className="initial-header">
          <h1>Welcome {status.name}</h1>
        </div>
        <div className="initial-container">
          <div className="initial-child w-25">
            <StudentMessage Status ={status.student} Role ="student" StudentNum={student_num}/>
            <ProgressBar animated variant="info" label={`${Math.max(0,status.student*25)}%`} now={Math.max(0,status.student*25)} />
          </div>

          <div className="vl"></div>
          <div className="initial-child w-25">
            <StudentMessage Status ={status.mentor} Role = "mentor" StudentNum={student_num}/>
            <ProgressBar animated variant="success" label={`${Math.max(0,status.mentor*25)}%`} now={Math.max(0,status.mentor*25)} />
          </div>
      </div>
      </div>
    </div>
  );
};

const StudentMessage = (props)=>{
  let nav = useNavigate();
  const handleTeamPage = ()=>{
    console.log("hello")
    axios.post("/teams/getTeam",{'student_num':props.StudentNum})
    .then((res)=>{
      console.log(res)
      var team_id = res.data.team_id
      nav(`/team/${team_id}`);
    })
    .catch((e)=>{
      console.log(e)
      alert("Please contact Admins")
    })
  }
  if (props.Status == -1){
    return (
      <div>
        Please apply next time
      </div>
    )
  }else if (props.Status == 0){
    return (
      <div>
        <Button
          onClick={() => props.Role=="student"?nav(`student/app`):nav('mentor/app')}
          size="large"
          variant="outline-primary"
        >
          { props.Role=="student"?"Student Application":"Mentor Application"}
        </Button>
      </div>
    )
  }else if (props.Status == 1){
    return (
      <h3>
        We received your application, please wait patiently.
      </h3>
    )
  }else if (props.Status == 2){
    return (
      <h3>
        You are currently in Interview stage.
      </h3>
    )
  }else if (props.Status == 3){
    return (
      <div>
        <h1>Congratulations!</h1>
        <h3>You are currently in team matching stage.</h3>
      </div>
    )
  }else{
    return (
      <div>
        <h1>Congratulations!</h1>
        <h3>We have assigned you a team.</h3>
        <Button
          size="large"
          variant="outline-primary"
          onClick={()=>handleTeamPage()}
        >
          Go to my team
        </Button>
      </div>
    )
  }
}
export default Initial;
