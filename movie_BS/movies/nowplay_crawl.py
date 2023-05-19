import requests
# from models import Movies
import json

# TMDb API 키
api_key = '060ae140dbed8317c5d2ecc12843b073'
# for i in range(1,12):
# # TMDb API에서 영화 정보 가져오기
# # url = f'https://api.themoviedb.org/3/movie/now_playing?api_key={api_key}&language=ko-KR&page=2&region=kr'
#     url = f'https://api.themoviedb.org/3/discover/movie?api_key={api_key}&include_adult=true&include_video=false&language=ko-KR&page={i}&region=KR&sort_by=vote_count.desc&vote_count.gte=9999'
#     response = requests.get(url)
#     data = response.json()
#     # print(data)
#     # Movie 모델 인스턴스 생성 및 저장
#     # movie = Movie(
#     #     title=data['title'],
#     #     release_date=data['release_date'],
#     #     overview=data['overview'],
#     #     # 필요한 다른 필드들을 설정합니다.
#     # )


#     with open(f'popular{i}.json', 'w', encoding='utf-8') as file:
#         json.dump(data, file, ensure_ascii=False)

def extract_results(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    results = data['results']

    extracted_results = []

    # 영화 데이터 추출
    # for result in results:
    #     extracted_result = {
    #         'model': 'movies.movies',
    #         'fields':{
    #         'movie_id': result['id'],
    #         'title': result['title'],
    #         'poster_path': result['poster_path'],
    #         'overview': result['overview'],
    #         'genre_ids': result['genre_ids'],
    #         'vote_count': result['vote_count'],
    #         'vote_average': result['vote_average'],
    #         'backdrop_path': result['backdrop_path'],
    #         'view_cnt': 0,
    #         # 'star_score': 0.0,
    #         }
    #     }
    #     extracted_results.append(extracted_result)

    # 장르 추출
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

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(extracted_data, f, indent=4, ensure_ascii=False)


# for i in range(1,12):
# # 입력 파일과 출력 파일의 경로를 지정합니다.
#     input_file = f'popular{i}.json'
#     output_file = f'popular{i}.json'

#     # # 결과 추출 및 JSON 파일 생성 함수를 호출합니다.
#     extract_results(input_file, output_file)

def merge_json_files(input_files, output_file):
    merged_data = []

    for file in input_files:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            merged_data.extend(data)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, indent=4, ensure_ascii=False)

# 입력 파일과 출력 파일의 경로를 지정합니다.
input_files = ['popular1.json', 'popular2.json', 'popular3.json', 'popular4.json', 'popular5.json',
               'popular6.json', 'popular7.json', 'popular8.json', 'popular9.json', 'popular10.json', 'popular11.json']
output_file = 'merged_popular.json'

# JSON 파일 병합 함수를 호출합니다.
merge_json_files(input_files, output_file)