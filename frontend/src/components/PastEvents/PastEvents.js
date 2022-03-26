import {useState,useEffect} from "react";
import {Row,Col} from "react-bootstrap";
import "./PastEvents.css";
import axios from "axios";

const PastEvents = ()=>{
    const [events, setEvents] = useState([]);
    useEffect(()=>{
        console.log("hello")
        getPastEvents();
    },[])

    const getPastEvents = ()=>{
        axios.get("/events/eventGetPast")
        .then((res)=>{
            setEvents(res.data.events);
        })
        .catch((e)=>{
            alert(e)
        })
    }
    return (
        <div className="main event_container mt-5">
            {
                events.map((event)=>(
                    <div key={event.id} className="bg-white w-75 container_width shadow p-3 text_box">
                        <h1>{event.name}</h1>
                        <Row className ="ps-5 pe-5">
                            <Col sm={3} className="text-start">
                                Date:
                            </Col>
                            <Col sm={6} className="text-start w-auto">
                                {event.event_date.slice(0,10)}
                            </Col>
                        </Row>
                        <Row className ="ps-5 pe-5">
                            <Col sm={3} className="text-start">
                                Location:
                            </Col>
                            <Col sm={6} className="text-start w-auto">
                                {event.location}
                            </Col>
                        </Row>
                        <p className="text_box_overflow mt-3">{event.description}asfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsdasfddddsfdsfsd</p>
                        <h6>
                            For more details, please visit <a href={event.link || "#"}>{event.name}</a>
                        </h6>
                    </div>
                ))
            }
        </div>
    )
}
export default PastEvents;
