from langflow.load import run_flow_from_json
TWEAKS = {
  "AstraDB-EKBBD": {},
  "GoogleGenerativeAIModel-qlP7k": {},
  "Prompt-pkDNT": {},
  "SplitText-noKyI": {},
  "ChatInput-iQ1bC": {
    "input_value": "chat question\n"
  },
  "Google Generative AI Embeddings-nluYv": {},
  "ChatOutput-TeJdd": {},
  "File-tw7FC": {}
}

result = run_flow_from_json(flow="Chat Ai.json",
                            input_value="message",
                            session_id="", # provide a session id if you want to use session state
                            fallback_to_env_vars=True, # False by default
                            tweaks=TWEAKS)