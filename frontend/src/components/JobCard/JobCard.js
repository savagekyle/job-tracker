import "./JobCard.css"

const JobCard = () => {
  return (
    <div className="job-card">
        <h4 className="title">Frontend Developer</h4>
        <p className="company">Dice</p>
        <p className="location">United States (Remote)</p>
        <p className="pay">$100K/yr - $125K/yr</p>
    </div>
  )
}

export default JobCard