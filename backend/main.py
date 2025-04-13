import os
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from memory import save_user_memory, get_user_context
from tools import get_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

chat_histories = {}

class Query(BaseModel):
    user_id: str
    message: str

@app.post("/api/ask")
async def ask_question(query: Query):
    user_id = query.user_id
    message = query.message

    history = chat_histories.get(user_id, [])
    history.append({"role": "user", "content": message})

    memory_context = get_user_context(user_id)
    smart_response = get_response(message, memory_context)

    prompt = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])
    prompt += f"\nmodel: {smart_response}"

    gemini_api_key = os.getenv("GEMINI_API_KEY")
    response = requests.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",  # Updated URL
        headers={"Authorization": f"Bearer {gemini_api_key}"},
        json={"contents": [{"parts": [{"text": prompt}]}]}
    )

    if response.status_code == 200:
        bot_reply = response.json()['candidates'][0]['content']['parts'][0]['text']
        history.append({"role": "model", "content": bot_reply})
        chat_histories[user_id] = history
        save_user_memory(user_id, message, bot_reply)
        return {"response": bot_reply}
    else:
        return {"response": "Sorry, there was an error contacting Gemini API."}
