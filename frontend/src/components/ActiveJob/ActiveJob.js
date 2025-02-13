import "./ActiveJob.css"
import DOMPurify from 'dompurify';

const ActiveJob = ({job}) => {
  return (
    <div className="application-expanded">
      <div className="active-top">
        <p className="company">{job.company}</p>
        <h2 className="job-title">{job.jobTitle}</h2>
        <p className="location">{job.location}</p>
        <p className="pay">{job.pay ? job.pay : <i>"No compensation provided"</i>}</p>
        <a href={job.url} target="_blank" rel="noreferrer">View Listing</a>
      </div>
        
        <hr />
        <div className="job-desc">
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}></p>
        </div>
    </div>
  )
}

export default ActiveJob