import requests
from bs4 import BeautifulSoup

# List to store job data
l = []
o = {}

# Target URL and query parameters
target_url = "https://www.indeed.com/jobs"
params = {
    'q': 'motorcycle mechanic',  # Job title
    'l': 'New York, NY',         # Location
}

# Updated HTTP headers
http_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Referer': 'https://www.google.com',  # Mimics a referral from Google
    'Host': 'www.indeed.com',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'DNT': '1',  # Do Not Track header
}

# Make the request
resp = requests.get(target_url, headers=http_headers, params=params, allow_redirects=True,
                    verify=True, timeout=30)

# Check response status and proceed if successful
if resp.status_code == 200:
    print("Request Successful:", resp.status_code)
    soup = BeautifulSoup(resp.text, 'html.parser')

    # Find the job listings container
    allData = soup.find("div", {"class": "mosaic-provider-jobcards"})
    if allData:
        alllitags = allData.find_all("li", {"class": "eu4oa1w0"})
        print(f"Number of job listings found: {len(alllitags)}")

        # Loop through each job listing and extract details
        for i in range(len(alllitags)):
            try:
                o["name-of-the-job"] = alllitags[i].find("a").find("span").text
            except Exception as e:
                o["name-of-the-job"] = None

            try:
                o["name-of-the-company"] = alllitags[i].find("span", {"data-testid": "company-name"}).text
            except Exception as e:
                o["name-of-the-company"] = None

            try:
                o["job-location"] = alllitags[i].find("div", {"data-testid": "text-location"}).text
            except Exception as e:
                o["job-location"] = None

            try:
                o["job-details"] = alllitags[i].find("div", {"class": "jobMetaDataGroup"}).text
            except Exception as e:
                o["job-details"] = None

            # Append job details to the list
            l.append(o)
            o = {}  # Reset for the next job

        # Print the extracted job listings
        for job in l:
            print(job)
    else:
        print("Job listings container not found!")
else:
    print(f"Failed to fetch page. Status Code: {resp.status_code}")
