import requests
from decouple import config

genius_api = config('genius_api')

def request_song_info(song_title):
    base_url = 'https://api.genius.com'
    headers = {'Authorization': 'Bearer ' + genius_api}
    search_url = base_url + '/search'
    data = {'q': song_title, 'per_page':18}
    response = requests.get(search_url, data=data, headers=headers)
    # per_page=20&page=6&q=weed


    return response