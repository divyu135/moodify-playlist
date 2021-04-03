from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import json
from decouple import config

def get_moods(text):
    ibm_api = config('ibm_api')
    ibm_url = config('ibm_url')

    authenticator = IAMAuthenticator(ibm_api)
    tone_analyzer = ToneAnalyzerV3(
        version='2017-09-21',
        authenticator=authenticator
    )

    tone_analyzer.set_service_url(ibm_url)

    tone_analysis = tone_analyzer.tone(
        {'text': text},
        content_type='application/json'
    ).get_result()
    # print(json.dumps(tone_analysis["document_tone"], indent=2))

    return tone_analysis["document_tone"]
