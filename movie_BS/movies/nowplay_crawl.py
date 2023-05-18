import requests
# from models import Movies
import json

# TMDb API 키
api_key = '060ae140dbed8317c5d2ecc12843b073'

# TMDb API에서 영화 정보 가져오기
# url = f'https://api.themoviedb.org/3/movie/now_playing?api_key={api_key}&language=ko-KR&page=2&region=kr'
# response = requests.get(url)
# data = response.json()
# print(data)
# Movie 모델 인스턴스 생성 및 저장
# movie = Movie(
#     title=data['title'],
#     release_date=data['release_date'],
#     overview=data['overview'],
#     # 필요한 다른 필드들을 설정합니다.
# )

# movies = [
#     {
#         'title': 'Movie 1',
#         'release_date': '2022-01-01',
#         'overview': 'This is movie 1.'
#     },
#     {
#         'title': 'Movie 2',
#         'release_date': '2022-02-01',
#         'overview': 'This is movie 2.'
#     }
# ]

# with open('now_playing2.json', 'w') as file:
#     json.dump(data, file, ensure_ascii=False)

def extract_results(input_file, output_file):
    with open(input_file, 'r') as f:
        data = json.load(f)

    results = data['results']

    extracted_results = []

    for result in results:
        extracted_result = {
            'model': 'movies.movies',
            'fields':{
            'movie_id': result['id'],
            'title': result['title'],
            'poster_path': result['poster_path'],
            'overview': result['overview'],
            'genre_ids': result['genre_ids'],
            'vote_count': result['vote_count'],
            'vote_average': result['vote_average'],
            'backdrop_path': result['backdrop_path'],
            'view_cnt': 0,
            # 'star_score': 0.0,
            }
        }
        extracted_results.append(extracted_result)

    extracted_data = extracted_results

    with open(output_file, 'w') as f:
        json.dump(extracted_data, f, indent=4, ensure_ascii=False)

# 입력 파일과 출력 파일의 경로를 지정합니다.
input_file = 'now_playing.json'
output_file = 'now_playing2.json'

# 결과 추출 및 JSON 파일 생성 함수를 호출합니다.
extract_results(input_file, output_file)