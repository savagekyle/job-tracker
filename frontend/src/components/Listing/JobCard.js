import './JobCard.css';

function JobCard() {
  return (
    <div className="job-card">
        <h3 className="job-title">Job Title</h3>
        <p className="company-name">Company Name</p>
        <p className="location">Location</p>
        <p className="pay">Pay</p>
        <p className="desc"></p>
    </div>
  );
}

export default JobCard;