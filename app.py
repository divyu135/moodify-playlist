from flask import Flask, request, jsonify
from flask_cors import CORS
from api.lyrics_scrapper import GetLyrics
from api.search import request_song_info
from decouple import config
from api.tone_analyzer import get_moods
from api.db_songs import add_song
from api.db_songs import get_playlist
from api.db_users import verify_user
from api.db_users import insert_user

genius_api = config('genius_api')
ibm_api = config('ibm_api')


app = Flask(__name__)
CORS(app)

# @app.route('/hello')
# def say_hello_world():
#     return {'result': "Hello, welcome to my world"}

# @app.route("/lyrics",methods=['GET', 'POST'])
# def display_lyrics():
#     songs = GetLyrics()
#     song_lyrics = songs.get_lyrics(["in the end"],["linkin park"]) 
#     song_json =  { "text":song_lyrics[0].replace("\n"," ")}
#     return(song_json)

# @app.route("/mood", methods=['GET','POST'])
# def lyrics_mood():
#      text = display_lyrics()['text'] 
#      moods = get_moods(text)
#      return moods

@app.route("/search",methods=['GET', 'POST'])
def search():
    search_json = request.get_json()

    if not search_json:
        return jsonify({'msg': 'Missing JSON'}), 400
    
    search_text = search_json.get('search_text')
    if not search_text:
        return jsonify({'msg': 'Search text is missing'}), 400

    search_results = request_song_info(search_text)
    # search_results = request_song_info("linkin")
    return search_results.json()

@app.route("/add_song",methods=['GET', 'POST'])
def add_song_db():
    req_json = request.get_json()

    if not req_json:
        return jsonify({'msg': 'Missing JSON'}), 400
    else:
        song_id = req_json.get('song_id')
        if not song_id:
            return jsonify({'msg': 'Song id is missing'}), 400
        else:
            # print("song_id: ",song_id)
            mood_type = add_song(song_id)
            return jsonify({'mood_type': mood_type}), 200


@app.route('/sign_in', methods=['POST'])
def sign_in():
    req = request.get_json()
    if not req:
        return jsonify({'msg': 'Missing JSON'}), 400
    
    email = req.get('email')
    password = req.get('password')

    user = verify_user(email,password)
    if user:
        return jsonify({
                        'msg': 'success', 
                        'user_id': user[0],
                        'firstname': user[1],
                        'lastname': user[2],
                        }), 200
    
    return jsonify({'msg': 'invalid'}), 400

@app.route('/sign_up', methods=['POST'])
def sign_up():
    req = request.get_json()
    if not req:
        return jsonify({'msg': 'Missing JSON'}), 400
    
    email = req.get('email')
    password = req.get('password')
    firstname = req.get('firstname')
    lastname = req.get('lastname')

    if insert_user(firstname, lastname, password, email):
        return jsonify({'msg': 'success', }), 200
    else:
        return jsonify({'msg': 'invalid'}), 400
        
@app.route("/playlist",methods=['GET', 'POST'])
def mood_search():
    mood_json = request.get_json()

    if not mood_json:
        return jsonify({'msg': 'Missing JSON'}), 400

    mood_type = mood_json.get('selected_mood')
    if not mood_type:
        return jsonify({'msg': 'Mood type is missing'}), 400

    playlist = get_playlist(mood_type)
    return jsonify({'playlist': playlist})