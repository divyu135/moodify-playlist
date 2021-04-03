import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, EmotionOptions
from decouple import config

def get_moods(text):
    apikey = config('nlp_apikey')
    url = config('nlp_url')

    authenticator = IAMAuthenticator(apikey)
    natural_language_understanding = NaturalLanguageUnderstandingV1(
        version='2020-08-01',
        authenticator=authenticator
    )

    natural_language_understanding.set_service_url(url)

    response = natural_language_understanding.analyze(
        html= text,
        features=Features(emotion=EmotionOptions(document=True))).get_result()

    # temp = response["emotion"]["document"]["emotion"]
    # emotion = max(temp, key=temp.get)
    # print(emotion)

    return response["emotion"]["document"]["emotion"]
