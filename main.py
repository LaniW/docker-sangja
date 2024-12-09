from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM

def get_model(model_path):
    tokenizer = AutoTokenizer.from_pretrained(model_path, low_cpu_mem_usage=True)
    model = AutoModelForCausalLM.from_pretrained(model_path, low_cpu_mem_usage=True)
    return model, tokenizer

en_ko_model, en_ko_tokenizer = get_model('models/en_ko/')

app = Flask(__name__)

@app.route('/', methods=['POST'])
def translate_endpoint():
    data = request.get_json()
    from_text = data.get('en_text', '')
    if from_text:
        to_text = en_ko_tokenizer.decode(
            en_ko_model.generate(en_ko_tokenizer.encode(from_text, return_tensors='pt')).squeeze(),
            skip_special_tokens=True
        )
        return jsonify({'ko_text': to_text})
    else:
        return jsonify({'error': 'Text to translate not provided'}), 400
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)