import Nav from "../../components/global/Navigation/Nav";
import "./OurGoal.css";

const OurGoal = () => {
  return (
    <div className="our-goal">
        {/* Background Design */}
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        {/* Nav */}
        <Nav />
        {/* Main Content */}
        <div className="banners">
            <div className="banner-top">
                <div className="container">
                    <h2>Our Purpose</h2>
                    <p>This website was created to solve a problem. Have you ever been actively job hunting and wanted a simple way to log all of your applications?
                        We had the same problem! We say that it is time to put the days of manually inputting job information into an excel spreadsheet behind us.
                        Our mission was to create a solution to this problem, and we are proud to say we have met this goal.
                        All we ask of you is a link to that promising job post, and we will handle the tedious process of saving that job information for you.
                    </p>
                </div>             
            </div>
            <div className="banner-bottom">
                <div className="container">
                    <h2>Where from here?</h2>
                    <p>At this point in time, Job Tracker is currently only able to log jobs from LinkedIn. Our next goal is to implement other major job boards, such as Indeed. We hope to one day be the one stop solution for all major job boards, and not just LinkedIn. There can be challenges when attempting to  extract job information from certain job boards, and we are actively searching for the most effective way to conquer these challenges.
                    </p>
                </div>             
            </div>
        </div>
    </div>
  )
}

export default OurGoal