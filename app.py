import os
import json
import urllib.request
import urllib.parse
from flask import Flask, request, jsonify, send_from_directory
app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')
# Route to serve the main HTML file
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')
# Endpoint to handle translations
@app.route('/api/translate', methods=['POST'])
def translate():
    try:
        # Parse requests
        req_data = request.get_json() or {}
        text = req_data.get('text', '').strip()
        source_lang = req_data.get('source_lang', 'auto')
        target_lang = req_data.get('target_lang', 'en')
        if not text:
            return jsonify({
                'translated_text': '',
                'detected_lang': ''
            })
        # Try Google Translate Free Client API first
        google_url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={source_lang}&tl={target_lang}&dt=t&q={urllib.parse.quote(text)}"
        
        req = urllib.request.Request(
            google_url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                
            if res_data and res_data[0]:
                # Combine all translated sentences/segments
                translated_text = "".join([segment[0] for segment in res_data[0] if segment[0]])
                
                # Fetch detected language if using auto-detect
                detected_lang = ''
                if source_lang == 'auto' and len(res_data) > 2:
                    detected_lang = res_data[2]
                
                return jsonify({
                    'translated_text': translated_text,
                    'detected_lang': detected_lang
                })
            else:
                raise ValueError("Invalid Google Translate response format")
                
        except Exception as google_err:
            print(f"Google Translate failed: {google_err}. Trying MyMemory API fallback...")
            
            # Fallback to MyMemory API
            mymemory_source = 'Autodetect' if source_lang == 'auto' else source_lang
            mymemory_url = f"https://api.mymemory.translated.net/get?q={urllib.parse.quote(text)}&langpair={mymemory_source}|{target_lang}"
            
            mymemory_req = urllib.request.Request(
                mymemory_url,
                headers={'User-Agent': 'Mozilla/5.0'}
            )
            
            with urllib.request.urlopen(mymemory_req, timeout=5) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                
            if res_data and 'responseData' in res_data and res_data['responseData']:
                translated_text = res_data['responseData']['translatedText']
                return jsonify({
                    'translated_text': translated_text,
                    'detected_lang': '' # MyMemory does not always return explicit source codes
                })
            else:
                raise ValueError("Invalid MyMemory response format")
                
    except Exception as e:
        print(f"Translation error: {e}")
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    # Run the server on port 5000
    app.run(host='127.0.0.1', port=5000, debug=True)
