from transformers import pipeline
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from newspaper import Article

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/summarize")
async def summarize(url: str= Form(...)):
    # Extract article text from the URL
    article = Article(url)
    article.download()
    article.parse()
    text = article.text

    # Summarize
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    result = (summarizer(text, max_length=300, min_length=30, do_sample=False))
    print(result)
    return {"summary": result[0]["summary_text"]}