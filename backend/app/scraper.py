import requests
from bs4 import BeautifulSoup
import pandas as pd

# Define headers to mimic a browser
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
}

# Input a single job listing URL
job_url = input("Enter the LinkedIn job listing URL: ")

# Fetch the job page content
response = requests.get(job_url, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    test = pd.DataFrame([soup.prettify])
    test.to_csv('html.csv', index=False, encoding='utf-8')
    job_data = {}

    # Extract company name
    try:
        job_data["company"] = soup.find("img", {
            "class": "artdeco-entity-image",
        })["alt"] if soup.find("img", {
            "class": "artdeco-entity-image",
        }) else None
    except AttributeError:
        job_data["company"] = None

    # Extract job title
    try:
        job_data["job-title"] = soup.find("h1", {"class": "top-card-layout__title"}).text.strip()
    except AttributeError:
        job_data["job-title"] = None

    # Extract job location
    try:
        job_data["location"] = soup.find("span", {"class": "topcard__flavor topcard__flavor--bullet"}).text.strip()
    except AttributeError:
        job_data["location"] = None

    # Extract the job description
    try:
        job_data["description"] = soup.find(
            "div", 
            class_="show-more-less-html__markup show-more-less-html__markup--clamp-after-5 relative overflow-hidden"
        ).get_text(strip=True, separator="\n")        
    except:
        job_data["description"] = None

    # Print and save the job data
    df = pd.DataFrame([job_data])
    df.to_csv('linkedinjobs_single.csv', index=False, encoding='utf-8')
    print("Job data saved to 'linkedinjobs_single.csv'")
else:
    print(f"Failed to fetch job details. HTTP Status Code: {response.status_code}")
