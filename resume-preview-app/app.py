from flask import Flask, send_file, request
import subprocess
import os

app = Flask(__name__)
TEX_FILE = 'resume.tex'
PDF_FILE = 'resume.pdf'

@app.route('/generate', methods=['POST'])
def generate_pdf():
    with open(TEX_FILE, 'w') as f:
        f.write(request.data.decode())

    subprocess.run(['pdflatex', TEX_FILE])
    return send_file(PDF_FILE, as_attachment=False)

@app.route('/download')
def download():
    return send_file(PDF_FILE, as_attachment=True)

@app.route('/')
def index():
    return {"message": "Backend is running!"}

if __name__ == '__main__':
    app.run()
