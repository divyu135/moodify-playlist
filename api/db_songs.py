from pymongo import MongoClient
from api.lyrics_scrapper import GetLyrics
from api.lyrics_scrapper import scrape_lyrics_2
# from api.tone_analyzer import get_moods
from api.nlp_emotion import get_moods
import json
from bson import json_util


mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('moodify')
songs_collection = db.get_collection('songs')
lyrics_collection = db.get_collection('song_lyrics')


def add_song(song_id):
    songs = GetLyrics()
    song_dict = songs.get_song_info_by_id(song_id)

    if songs_collection.count_documents({ 'song_id': song_id }, limit = 1) == 0:
        songs_collection.insert_one(song_dict)
        print("\ninserted 1 song in collection: songs!\n")
        add_lyrics(song_dict["song_id"],song_dict["url"]) 
    else:
        print("\nsong already exist in database!\n")
    di = lyrics_collection.find_one({"song_id":song_id})["mood"]
    mood = max(di, key=di.get)
    return mood

def add_lyrics(song_id, url):
    lyrics_temp = scrape_lyrics_2(url)
    lyrics_dict = {
        "song_id": song_id,
        "lyrics" : lyrics_temp,
        "mood": get_moods(lyrics_temp)
    }
    lyrics_collection.insert_one(lyrics_dict)
    print("\ninserted 1 lyric and its mood in collection: song_lyrics!\n")

def get_playlist(mood):
    results = lyrics_collection.find({ "mood."+mood: { "$gt": .55 } })
    
    list = []
    for result in results:
        song = songs_collection.find_one({"song_id": result["song_id"]})
        list.append(json.loads(json_util.dumps(song))) 
    return list