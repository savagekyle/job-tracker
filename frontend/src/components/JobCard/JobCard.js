import "./JobCard.css"

const JobCard = (props) => {
  return (
    <div className="job-card">
        <h4 className="title">{props.title}</h4>
        <p className="company">{props.company}</p>
        <p className="location">{props.location}</p>
        <p className="pay">{props.pay ? props.pay : <i>"No compensation provided"</i>}</p>
    </div>
  )
}

export default JobCard