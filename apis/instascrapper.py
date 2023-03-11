from flask import Flask, request, jsonify
import instaloader
import requests
import openai
from bs4 import BeautifulSoup

app = Flask(__name__)

openai.api_key = "API-KEY"                                              # OPEN-AI API KEY
completion = openai.Completion()

@app.route('/get_content', methods=['GET'])
def get_content():
    insta_id = request.args.get('instagramid')
    github_id = request.args.get('githubid')
    name = request.args.get('name')
    location = request.args.get('location')
    content = ""

    content += "Name: " + str(name)
    content += "Current GPS Location: " + str(location)


    L = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(L.context, insta_id)
    content += "User Bio: " + profile.biography + "\n"

    # Github profile
    url = "https://www.github.com/"+github_id
    page = requests.get(url).content
    soup = BeautifulSoup(page, 'html.parser')
    name = soup.find("span", {"class": "p-name"})
    username = soup.find("span", {"class": "p-nickname"})
    bio = soup.find("div", {"class": "p-note user-profile-bio mb-3 js-user-profile-bio f4"})
    location = soup.find("span", {"class": "p-label"})
    website = soup.find("a", {"class": "u-url u-uid"})
    bio = soup.find("article", {"class": "markdown-body entry-content container-lg f5"})

    content += "Name: "+ name.text.strip() + "\n"
    content += "Username: "+ username.text.strip() + "\n"
    content += "Bio: "+ bio.text.strip() + "\n"
    content += "Location: "+ location.text.strip() + "\n"
    
    return jsonify({"content": content})


def ask(content, chat_log=None):
    
    prompt = f'{start_chat_log} {content}'
    response = completion.create(
        prompt=prompt, engine="text-davinci-003", stop=['\nHuman'], temperature=0.9,
        top_p=1, frequency_penalty=0.5, presence_penalty=0.0, best_of=1,
        max_tokens=1024)
    answer = response.choices[0].text.strip()
    return answer

if __name__ == '__main__':
    app.run(host='localhost',port=4000,debug=True)