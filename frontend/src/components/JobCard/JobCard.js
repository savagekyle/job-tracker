import "./JobCard.css"
import CloseIcon from '@mui/icons-material/Close';

const JobCard = (props) => {
  return (
    <div className="job-card" onClick={props.onClick}>
        <h4 className="title">{props.title}</h4>
        <p className="company">{props.company}</p>
        <p className="location">{props.location}</p>
        <p className="pay">{props.pay ? props.pay : <i>"No compensation provided"</i>}</p>
        <CloseIcon className="closeIcon" fontSize="small" />
        <p className="dateApplied">{props.date}</p>
    </div>
  )
}

export default JobCard