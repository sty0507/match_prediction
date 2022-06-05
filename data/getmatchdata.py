# 경기 데이터 받아옴

import http.client
import json
import pandas as pd
import pymysql

conn = pymysql.connect(host='localhost', user = 'root', password ='root', db='match_prediction')
cursor = conn.cursor()
connection = http.client.HTTPConnection('api.football-data.org')
headers = { 'X-Auth-Token' : 'a5138360d35743f1961282ccb58f088f' }
connection.request('GET', '/v2/matches', None, headers )
response = json.loads(connection.getresponse().read().decode())
key_matches = response.get('matches')

# ===========================|데이터 가공|=================================
competition = list(c['competition'] for c in key_matches)
competition_name = list(c['name'] for c in competition)

homeTeam = list(km['homeTeam'] for km in key_matches)
homeTeam_name = list(ht['name'] for ht in homeTeam)

awayTeam = list(km['awayTeam'] for km in key_matches)
awayTeam_name = list(at['name'] for at in awayTeam)

match_status = list(st['status'] for st in key_matches)

match_score = list(sc['score'] for sc in key_matches)

live_score = list(ls['fullTime'] for ls in match_score)

live_score_homeTeam = list(lsh['homeTeam'] for lsh in live_score)

live_score_awayTeam = list(lsh['awayTeam'] for lsh in live_score)

# =================================================================

for hn, an, cn, ms, lsh, lsa in zip(homeTeam_name, awayTeam_name, competition_name, match_status, live_score_homeTeam,live_score_awayTeam):
    cursor.execute(f"INSERT INTO schedule (HomeTeam,AwayTeam,Competition,match_status,Live_Score_HomeTeam,Live_Score_AwayTeam) VALUES (\'{hn}\',\'{an}\',\'{cn}\',\'{ms}\',\'{lsh}\',\'{lsa}\')")
    print("good")

conn.commit()
conn.close()

