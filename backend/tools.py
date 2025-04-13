from api_integrations import fetch_gadget_data, fetch_news_reviews

def get_response(user_input, memory_context):
    if "compare" in user_input.lower():
        return fetch_gadget_data(user_input)
    elif "review" in user_input.lower():
        return fetch_news_reviews(user_input)
    else:
        return f"Based on your preferences: {memory_context}, here's a suggestion: {fetch_gadget_data(user_input)}"
