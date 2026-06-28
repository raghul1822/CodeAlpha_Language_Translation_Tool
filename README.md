<h1 align="center">AI Language Translation Tool</h1>

<h3 align="center">Production-Ready Multilingual Translation Platform</h3>

<p align="center"><i>Built with <b>Python</b>, <b>Flask</b>, and <b>Vanilla JavaScript</b></i></p>

<p align="center">Automatic Language Detection • Speech Recognition • Text-to-Speech • Intelligent Translation Fallback • Responsive UI</p>


<p align="center">
  <img src="https://skillicons.dev/icons?i=python" height="48"/>
  <img src="https://skillicons.dev/icons?i=flask" height="48"/>
  <img src="https://skillicons.dev/icons?i=html,css,js" height="48"/>
  <img src="https://skillicons.dev/icons?i=git,github,vscode" height="48"/>
  <img src="https://cdn.simpleicons.org/googletranslate/4285F4" height="45"/>
  <img src="https://cdn.simpleicons.org/googlechrome/4285F4" height="45"/>
</p>

---

# About

The **AI Language Translation Tool** is a modern full-stack web application designed to deliver fast, accurate, and reliable multilingual translation through a responsive browser interface. Developed using **Python**, **Flask**, and **Vanilla JavaScript**, the application integrates browser-native APIs with cloud-based translation services to provide an intuitive and seamless user experience.

The platform supports **Automatic Language Detection**, **Speech-2-Text Input**, **Text-2-Speech Output**, **Language Swapping**, and **Clipboard Integration**, enabling users to translate content efficiently across multiple languages. To improve service reliability, the backend implements an intelligent fallback mechanism that automatically switches between translation providers whenever the primary service is unavailable.

Designed with a modular client-server architecture, the project demonstrates practical implementation of RESTful APIs, asynchronous communication, browser speech technologies, robust error handling, and scalable frontend-backend integration. The codebase emphasizes maintainability, readability, and extensibility, making it suitable for future enhancements such as OCR-based translation, document translation, cloud deployment, and AI-powered multilingual assistants.

--- 

# Key Features

| Feature | Description |
|----------|-------------|
| 🌍 Multi-Language Translation | Translate text across more than 24 supported languages. |
| 🤖 Automatic Language Detection | Detects the source language without manual selection. |
| 🎤 Speech-to-Text | Converts spoken language into text using the Web Speech API. |
| 🔊 Text-to-Speech | Reads translated text aloud for improved accessibility. |
| 🔄 Language Swapping | Instantly exchanges source and target languages while preserving user input. |
| 📋 Clipboard Integration | Copies translated output directly to the system clipboard. |
| 📊 Character Counter | Displays a live character count with a maximum input limit of 5,000 characters. |
| ⚡ Intelligent Translation Fallback | Automatically switches translation providers when the primary endpoint is unavailable. |
| 🔔 Real-Time Notifications | Provides immediate feedback for successful operations and error handling. |

---

# Overview

The **AI Language Translation Tool** is a full-stack web application that enables seamless translation of text across multiple languages through an intuitive browser interface. The application combines a lightweight **Flask REST API** with a responsive **Vanilla JavaScript** frontend to deliver fast, reliable, and user-friendly language translation capabilities.

The system integrates browser-native speech technologies with cloud-based translation providers, allowing users to translate text through typing or voice input while also supporting synthesized speech for translated output. To improve reliability, the backend employs an intelligent fallback strategy that automatically switches between translation providers whenever the primary service becomes unavailable.

Designed using a modular architecture, the project demonstrates practical experience in REST API development, frontend-backend communication, browser APIs, asynchronous programming, and production-oriented software engineering practices.

---

# System Architecture

```text
                        User
                          │
                          ▼
             Responsive Web Interface
        (HTML5 • CSS3 • JavaScript)
                          │
                          ▼
                 Flask REST API
                          │
         ┌────────────────┴────────────────┐
         ▼                                 ▼
 Google Translate Endpoint        MyMemory Translation API
        (Primary)                     (Fallback)
         │                                 │
         └────────────────┬────────────────┘
                          ▼
                 JSON Translation Response
                          │
                          ▼
                  Browser User Interface
```

---

# Technology Stack

### Programming Language

<img src="https://skillicons.dev/icons?i=python"/>

### Backend Development

<img src="https://skillicons.dev/icons?i=flask"/>

### Frontend Development

<img src="https://skillicons.dev/icons?i=html,css,js"/>

### Browser APIs

<img src="https://img.shields.io/badge/Web%20Speech%20API-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white"/>
<img src="https://img.shields.io/badge/Clipboard%20API-00599C?style=for-the-badge&logo=googlechrome&logoColor=white"/>

### Translation Services

<img src="https://img.shields.io/badge/Google%20Translate-4285F4?style=for-the-badge&logo=googletranslate&logoColor=white"/>
<img src="https://img.shields.io/badge/MyMemory%20Translation%20API-6D28D9?style=for-the-badge"/>

### Development Tools

<img src="https://skillicons.dev/icons?i=git,github,vscode"/>

---

# Project Structure

```text
AI-Language-Translation-Tool
│
├── __pycache__/                         # Compiled Python cache
├── .gitignore                           # Git ignore configuration
├── AI Language Translation Tool.pdf     # Project report & documentation
├── README.md                            # Project documentation
│
├── app.py                               # Flask application & translation API
├── app.js                               # Client-side JavaScript logic
├── index.html                           # Main web interface
├── languages.js                         # Supported language configuration
└── style.css                            # UI styling and responsive layout
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/raghul1822/ai-language-translation-tool.git

cd ai-language-translation-tool
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# Running the Application

Start the Flask development server:

```bash
python app.py
```

The application will be available at:

```text
http://127.0.0.1:5000
```

---

# Application Workflow

1. Users enter text manually or provide voice input using the microphone.
2. The frontend validates user input and sends a translation request to the Flask backend.
3. The backend attempts translation through the Google Translate endpoint.
4. If the primary service fails, the system automatically switches to the MyMemory Translation API.
5. The translated response is returned as JSON.
6. The frontend displays the translated output and enables speech playback, clipboard copy, and additional interactions.

---
# Project Documentation

For a detailed overview of the application, user interface, and workflow, view the project documentation below.

<p align="center">
  <a href="./AI%20Language%20Translation%20Tool.pdf">
    <img src="https://img.shields.io/badge/View_Project_Documentation-PDF-red?style=for-the-badge&logo=adobeacrobatreader&logoColor=white"/>
  </a>
</p>

--- 

# Technical Highlights

| Category | Implementation |
|-----------|----------------|
| Architecture | Modular Flask Application |
| API Design | RESTful Client–Server Communication |
| Frontend | Responsive Vanilla JavaScript Interface |
| Speech Processing | Speech Recognition & Text-to-Speech |
| Translation Engine | Multi-Provider Translation Pipeline |
| Reliability | Automatic Provider Fallback |
| User Experience | Toast Notifications & Clipboard Integration |
| Maintainability | Modular Project Structure |

---

# Future Enhancements

- Translation History
- User Authentication
- Dark Mode
- OCR-Based Image Translation
- Document Translation (PDF, DOCX)
- Docker Containerization
- Cloud Deployment (AWS / Azure)
- CI/CD Pipeline
- Official Translation API Integration

---

# Learning Outcomes

This project provided practical experience in developing a full-stack web application using Python and Flask while integrating external APIs and browser-native technologies. It strengthened knowledge of RESTful API development, asynchronous client-server communication, speech processing, frontend engineering, modular software architecture, and resilient error-handling strategies required for production-grade web applications.

---

# Acknowledgements

Developed as part of the **CodeAlpha Artificial Intelligence Internship Program** to demonstrate practical implementation of AI-assisted language translation using modern web technologies.

---

# Author

**Raghul A**

*Aspiring AI Engineer • Generative AI Developer • Python Developer • LLM & RAG Enthusiast*

- Email: **raghul182202@gmail.com**
- LinkedIn: **https://www.linkedin.com/in/raghul-ai-python/**
- GitHub: **https://github.com/raghul1822**

---

# License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it in accordance with the license terms.
