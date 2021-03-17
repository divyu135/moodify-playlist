from flask import Flask
from flask_cors import CORS
from api.lyrics_scrapper import GetLyrics
from decouple import config

genius_api = config('genius_api')
ibm_api = config('ibm_api')

app = Flask(__name__)
CORS(app)

@app.route('/hello')
def say_hello_world():
    return {'result': "Hello, welcome to my world"}

@app.route("/lyrics")
def display_lyrics():
    songs = GetLyrics(genius_api)
    song_lyrics = songs.get_lyrics(["old town road"],["Lil Nas X"]) 
    song_json =  { "text":song_lyrics[0].replace("\n"," ")}
    return(song_json)