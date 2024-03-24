from flask import Flask, request, jsonify
import instaloader
import requests
import openai
from bs4 import BeautifulSoup
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)

openai.api_key = ""                                         # OPEN-AI API KEY
completion = openai.Completion()
cors = CORS(app)

@app.route('/translate', methods=['GET', 'POST'])
def translate():
    translator = Translator()
    text = request.args.get('text')
    translated_text = translator.translate(text, dest='en')
    return translated_text.text


@app.route('/get_content', methods=['GET'])
def get_content():
    insta_id = request.args.get('instagramid')
    github_id = request.args.get('githubid')
    name = request.args.get('name')
    goals = request.args.get('goals')
    location = request.args.get('location')
    ct = request.args.get('content')
    content = "Generate the required user demographics with respect to goals using the following data:"

    content += "Name: " + str(name)
    content += "Current GPS Location: " + str(location)

    if ct is None:

        try:
            L = instaloader.Instaloader()
            profile = instaloader.Profile.from_username(L.context, insta_id)
            content += "User Bio: " + profile.biography + "\n"
        
        except Exception as e:
            print(e)
            pass

 
        try:
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
        except Exception as e:
            pass   
    content += f'''Generate almost accurate detailed user demographics from the above data with respect to the following survey goals {goals}, The some demographics can is derived or predicted like City living, description of City Living, emotion, gender etc related to the person , (top relevant attributes with high confidence) with respect to the goals '''
    content += goals
    content += "The format of response should be Question:Answer\n "
    response = ask(content)
    
    return jsonify({"content": response})


def ask(content, chat_log=None):
    
    prompt = content
    response = completion.create(
        prompt=prompt, engine="text-davinci-003", best_of=1,
        max_tokens=3000
        )
    answer = response.choices[0].text.strip()
    return answer

if __name__ == '__main__':
    app.run(host='localhost',port=4000,debug=True)