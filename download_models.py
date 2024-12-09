from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os

def download_model(model_path, model_name):
    """Download a Hugging Face model and tokenizer to the specified directory"""
    if not os.path.exists(model_path):
        os.makedirs(model_path)

    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

    model.save_pretrained(model_path)
    tokenizer.save_pretrained(model_path)

download_model('models/en_ko/', 'Helsinki-NLP/opus-mt-tc-big-en-ko')
download_model('models/ko_en/', 'Helsinki-NLP/opus-mt-ko-en')