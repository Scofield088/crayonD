user_memory = {}

def save_user_memory(user_id, query, response):
    if user_id not in user_memory:
        user_memory[user_id] = []
    user_memory[user_id].append({"query": query, "response": response})

def get_user_context(user_id):
    memory = user_memory.get(user_id, [])
    return " | ".join([m['query'] for m in memory])
