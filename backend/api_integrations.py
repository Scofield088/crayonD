import requests
import os

SERPER_API_KEY = os.getenv("SERPER_API_KEY")
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

def fetch_gadget_data(query):
    url = "https://serper.dev/api"
    headers = {"X-API-KEY": SERPER_API_KEY}
    params = {"q": query}
    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    return data.get("organic", [{}])[0].get("snippet", "No info found.")

def fetch_news_reviews(query):
    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    articles = response.json().get("articles", [])
    return articles[0]["description"] if articles else "No recent reviews found."
