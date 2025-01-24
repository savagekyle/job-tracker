import "./HowTo.css";
import CopyLink from "../../assets/copy-link.png"
import ShareListing from "../../assets/share-listing.jpg"
import Nav from "../../components/global/Navigation/Nav";

const HowTo = () => {
  return (
    <div className="how-to">
        {/* Background Elements */}
        <div className="bg-blob"></div>
        <div className="bg-blob"></div>
        {/* Nav */}
        <Nav />
        {/* Page content */}
        <div className="content container">
            <div className="exp">
                <h1>How It Works</h1>
                <p>Our goal is to make your process as simple as possible. All we ask of you is to provide us with the link to the job post!</p>
                <p>From this link, we will extract all relevant information and save it to your job list</p>
                <p>Below, you can see exactly how to get the URL for the job post. LinkedIn is the job board being used for the example images below.</p>
                <p className="note"><strong>Note:</strong> Other job boards will have a similar process of copying the link to the job post</p>
            </div>
            <img src={ShareListing} alt="A screenshot showing where to click to find the copy link button" />
            <img src={CopyLink} alt="A screenshot showing how to copy the link to the job listing" />
        </div>
    </div>
  )
}

export default HowTo