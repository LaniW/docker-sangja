from transformers import AutoTokenizer, AutoModelForCausalLM
import os

def download_model(model_path, model_name):
    if not os.path.exists(model_path):
        os.makedirs(model_path)

    tokenizer = AutoTokenizer.from_pretrained(model_name, low_cpu_mem_usage=True)
    model = AutoModelForCausalLM.from_pretrained(model_name, low_cpu_mem_usage=True)

    model.save_pretrained(model_path)
    tokenizer.save_pretrained(model_path)

download_model('models/en_ko/', 'microsoft/Phi-3-mini-4k-instruct')
