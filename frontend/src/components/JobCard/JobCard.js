import "./JobCard.css"
import CloseIcon from '@mui/icons-material/Close';
import { deleteJob } from "../../authService";

const JobCard = (props) => {

  const handleDelete = async (event) => {
    event.stopPropagation(); // Prevent job card click from triggering

    if (!props.id) {
      console.error("❌ Error: Job ID is undefined.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this job?")) {
      const result = await deleteJob(props.id);
      if (result.success) {
        if (props.refreshJobs) props.refreshJobs(); // Refresh job list if available
      } else {
        alert("Error deleting job: " + result.error);
      }
    }
  };

  return (
    <div className="job-card" onClick={props.onClick}>
        <h4 className="title">{props.title}</h4>
        <p className="company">{props.company}</p>
        <p className="location">{props.location}</p>
        <p className="pay">{props.pay ? props.pay : <i>"No compensation provided"</i>}</p>
        <CloseIcon className="closeIcon" fontSize="small" onClick={handleDelete} />
        <p className="dateApplied">{props.date}</p>
    </div>
  )
}

export default JobCard