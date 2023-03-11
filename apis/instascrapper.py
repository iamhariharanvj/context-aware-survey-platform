import instaloader

content = ""

L = instaloader.Instaloader()
username = "_hariharanvj_"
githubid = "iamhariharanvj"
profile = instaloader.Profile.from_username(L.context, username)
content += "User Bio: " + profile.biography

import requests
from bs4 import BeautifulSoup

# enter the GitHub profile URL of the user you want to scrape
url = "https://www.github.com/"+githubid

# send a GET request to the URL and get the page content
page = requests.get(url).content

# parse the page content using BeautifulSoup
soup = BeautifulSoup(page, 'html.parser')

# find the <span> tag containing the user's name
name = soup.find("span", {"class": "p-name"})

# find the <span> tag containing the user's username
username = soup.find("span", {"class": "p-nickname"})

# find the <div> tag containing the user's bio
bio = soup.find("div", {"class": "p-note user-profile-bio mb-3 js-user-profile-bio f4"})

# find the <span> tag containing the user's location
location = soup.find("span", {"class": "p-label"})

# find the <a> tag containing the user's website
website = soup.find("a", {"class": "u-url u-uid"})

bio = soup.find("article", {"class": "markdown-body entry-content container-lg f5"})


# print the user's profile details and demographics
content += "Name: "+ name.text.strip()
content += "Username: "+ username.text.strip()
content += "Bio: "+ bio.text
content += "Location: "+ location.text.strip()

print(content)

