import requests
from bs4 import BeautifulSoup
import json
from decouple import config

def scrape_lyrics_2(url):
    page = requests.get(url)
    html = BeautifulSoup(page.text, 'html.parser')
#         print(html)
    lyrics1 = html.find("div", class_="lyrics")
    lyrics2 = html.find("div", class_="Lyrics__Container-sc-1ynbvzw-2 jgQsqn")
    if lyrics1:
        lyrics = lyrics1.get_text()
    elif lyrics2:
        lyrics = lyrics2.get_text()
    elif lyrics1 == lyrics2 == None:
        lyrics = None
    return lyrics

class GetLyrics():
    
    def __init__(self):
        self.genius_key = config('genius_api')

    def get_song_info_by_id(self, song_id):
        base_url = 'https://api.genius.com'
        headers = {'Authorization': 'Bearer ' + self.genius_key}
        song_url = base_url + '/songs/' + str(song_id)
        # data = {'q': track_name + ' ' + track_artist}
        response = requests.get(song_url, headers=headers)
        song =response.json()["response"]["song"]

        song_details = {
                "song_id" : song["id"],
                "url" : song["url"],
                "title" : song["title"],
                "full_title" : song["full_title"],
                "media" : song["media"],
                "artist" : song["primary_artist"]["name"],
                "thumbnail" : song["song_art_image_thumbnail_url"]
        }
        
        return song_details

    def request_song_info(self, track_name, track_artist):
        self.track_name = track_name
        self.track_artist = track_artist
        base_url = 'https://api.genius.com'
        headers = {'Authorization': 'Bearer ' + self.genius_key}
        search_url = base_url + '/search'
        data = {'q': track_name + ' ' + track_artist}
        response = requests.get(search_url, data=data, headers=headers)
        self.response = response
        return self.response

    def check_hits(self):
        json = self.response.json()
        remote_song_info = None
        for hit in json['response']['hits']:
            if self.track_artist.lower() in hit['result']['primary_artist']['name'].lower():
                remote_song_info = hit
                break
        self.remote_song_info = remote_song_info
        return self.remote_song_info
    
    def get_url(self):
        song_url = self.remote_song_info['result']['url']
        self.song_url = song_url
        return self.song_url
    
    def scrape_lyrics(self):
        page = requests.get(self.song_url)
        html = BeautifulSoup(page.text, 'html.parser')
#         print(html)
        lyrics1 = html.find("div", class_="lyrics")
        lyrics2 = html.find("div", class_="Lyrics__Container-sc-1ynbvzw-2 jgQsqn")
        if lyrics1:
            lyrics = lyrics1.get_text()
        elif lyrics2:
            lyrics = lyrics2.get_text()
        elif lyrics1 == lyrics2 == None:
            lyrics = None
        return lyrics

    def get_lyrics(self,track_names,track_artists):
        song_lyrics = []
        for i in range(len(track_names)):
            print("\n")
            print(f"Working on track {i+1}.")
            response = GetLyrics.request_song_info(self, track_names[i], track_artists[i])
            remote_song_info = GetLyrics.check_hits(self)
            if remote_song_info == None:
                lyrics = None
                print(f"Track {i+1} is not in the Genius database.")
            else:
                url = GetLyrics.get_url(self)
                lyrics = GetLyrics.scrape_lyrics(self)
                if lyrics == None:
                    print(f"Track {i+1} is not in the Genius database.")
                else:
                    print(f"Retrieved track {i+1} lyrics!")
            song_lyrics.append(lyrics)
        return song_lyrics