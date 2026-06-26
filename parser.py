import requests
from bs4 import BeautifulSoup
import json

url = 'https://biathlonrus.com/results/...'  # замените на реальную страницу
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Пример парсинга таблицы
table = soup.find('table', class_='results-table')
rows = table.find_all('tr')

athletes = []
for row in rows:
    cols = row.find_all('td')
    if len(cols) > 0:
        name = cols[1].text.strip()
        # ... остальные поля
        athletes.append({...})

# Сохраняем в data.json
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(athletes, f, ensure_ascii=False, indent=2)
