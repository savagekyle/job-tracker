from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from datetime import date 

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
}

@app.route('/scrape-job', methods=['POST'])
def scrape_job():
    # Parse JSON payload from frontend
    data = request.json
    job_url = data.get('url')

    # Get todays date in MM/DD/YYYY format
    todays_date = date.today().strftime('%m/%d/%Y')

    if not job_url:
        return jsonify({'error': 'URL is required'}), 400

    response = requests.get(job_url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        job_data = {}

        job_data["date"] = todays_date
        # Extract job details (adjust selectors as needed)
        job_data["company"] = soup.find("img", {"class": "artdeco-entity-image"})["alt"] if soup.find(
            "img", {"class": "artdeco-entity-image"}) else None
        job_data["job-title"] = soup.find("h1", {"class": "top-card-layout__title"}).text.strip() if soup.find(
            "h1", {"class": "top-card-layout__title"}) else None
        job_data["location"] = soup.find("span", {"class": "topcard__flavor topcard__flavor--bullet"}).text.strip() if soup.find(
            "span", {"class": "topcard__flavor topcard__flavor--bullet"}) else None
        job_data["description"] = soup.find(
            "div", 
            class_="show-more-less-html__markup show-more-less-html__markup--clamp-after-5 relative overflow-hidden"
        ).decode_contents() if soup.find(
            "div", 
            class_="show-more-less-html__markup show-more-less-html__markup--clamp-after-5 relative overflow-hidden"
        ) else None
        job_data["pay"] = soup.find("div", {"class": "compensation__salary"}).text.strip() if soup.find("div", {"class": "compensation__salary"}).text.strip() else None


        return jsonify(job_data), 200
    else:
        return jsonify({'error': 'Failed to fetch job details'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
