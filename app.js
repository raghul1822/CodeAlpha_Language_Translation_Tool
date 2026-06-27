document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const sourceLangSelect = document.getElementById("source-lang");
    const targetLangSelect = document.getElementById("target-lang");
    const swapLangsBtn = document.getElementById("swap-langs-btn");
    const sourceTextarea = document.getElementById("source-textarea");
    const targetTextarea = document.getElementById("target-textarea");
    const translateBtn = document.getElementById("translate-btn");
    const charCounter = document.getElementById("char-counter");
    const clearTextBtn = document.getElementById("clear-text-btn");
    const speechInputBtn = document.getElementById("speech-input-btn");
    const copyBtn = document.getElementById("copy-btn");
    const ttsBtn = document.getElementById("tts-btn");
    const loader = document.getElementById("loader");
    const detectedLangBadge = document.getElementById("detected-lang-badge");
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    // State Variables
    let recognition = null;
    let isListening = false;
    let detectedLangCode = null;
    // 1. Initialize Dropdowns
    function initLanguages() {
        // Source select: includes auto-detect
        for (const [code, name] of Object.entries(languages)) {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = name;
            if (code === "auto") {
                option.selected = true;
            }
            sourceLangSelect.appendChild(option);
        }
        // Target select: does not include auto-detect
        for (const [code, name] of Object.entries(languages)) {
            if (code === "auto") continue;
            const option = document.createElement("option");
            option.value = code;
            option.textContent = name;
            // Default target language to Tamil (ta) or Spanish (es)
            if (code === "ta") {
                option.selected = true;
            }
            targetLangSelect.appendChild(option);
        }
        // Initialize Lucide Icons
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }
    // 2. Toast Notification Helper
    function showToast(message, isError = false) {
        toastMessage.textContent = message;
        const toastIcon = toast.querySelector(".toast-icon");
        
        if (toastIcon) {
            if (isError) {
                toastIcon.setAttribute("data-lucide", "alert-circle");
                toast.style.borderColor = "hsla(350, 90%, 60%, 0.35)";
                toastIcon.style.color = "hsl(350, 90%, 60%)";
            } else {
                toastIcon.setAttribute("data-lucide", "check-circle-2");
                toast.style.borderColor = "var(--primary-color)";
                toastIcon.style.color = "var(--secondary-color)";
            }
            lucide.createIcons();
        }
        toast.classList.remove("hidden");
        // Reflow for transition
        void toast.offsetWidth;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.classList.add("hidden");
            }, 400);
        }, 2500);
    }
    // 3. Translation Fetch Logic via Python Flask Backend
    async function translateText() {
        const text = sourceTextarea.value.trim();
        const sourceLang = sourceLangSelect.value;
        const targetLang = targetLangSelect.value;
        if (!text) {
            targetTextarea.value = "";
            detectedLangBadge.classList.add("hidden");
            detectedLangCode = null;
            showToast("Please enter some text to translate", true);
            return;
        }
        // Show loading states
        loader.classList.remove("hidden");
        translateBtn.disabled = true;
        const originalBtnText = translateBtn.innerHTML;
        translateBtn.innerHTML = `<span>Translating...</span>`;
        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text,
                    source_lang: sourceLang,
                    target_lang: targetLang
                })
            });
            if (!response.ok) {
                throw new Error("Translation backend returned an error status");
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            // Display result
            targetTextarea.value = data.translated_text || "";
            // Handle Detected Language Badge
            if (sourceLang === "auto" && data.detected_lang) {
                detectedLangCode = data.detected_lang;
                const cleanLangCode = detectedLangCode.split("-")[0]; // handle cases like en-US
                const detectedName = languages[cleanLangCode] || detectedLangCode.toUpperCase();
                detectedLangBadge.textContent = `Detected: ${detectedName}`;
                detectedLangBadge.classList.remove("hidden");
            } else {
                detectedLangBadge.classList.add("hidden");
                detectedLangCode = null;
            }
            
            showToast("Translation completed!");
        } catch (error) {
            console.error("Translation failed:", error);
            showToast("Failed to connect to translation server. Please try again.", true);
        } finally {
            // Restore loading states
            loader.classList.add("hidden");
            translateBtn.disabled = false;
            translateBtn.innerHTML = originalBtnText;
            lucide.createIcons();
        }
    }
    // 4. Input Changes & Helpers
    function handleSourceInput() {
        const textLength = sourceTextarea.value.length;
        charCounter.textContent = textLength;
        // Toggle clear button visibility
        if (textLength > 0) {
            clearTextBtn.classList.remove("hidden");
        } else {
            clearTextBtn.classList.add("hidden");
        }
    }
    // 5. Speech to Text (Dictation Input)
    function initSpeechToText() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            speechInputBtn.classList.add("hidden");
            console.log("Speech recognition not supported in this browser.");
            return;
        }
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = () => {
            isListening = true;
            speechInputBtn.classList.add("listening");
            speechInputBtn.innerHTML = `<i data-lucide="mic-off"></i>`;
            lucide.createIcons();
            showToast("Listening... Speak clearly.");
        };
        recognition.onend = () => {
            isListening = false;
            speechInputBtn.classList.remove("listening");
            speechInputBtn.innerHTML = `<i data-lucide="mic"></i>`;
            lucide.createIcons();
        };
        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            isListening = false;
            speechInputBtn.classList.remove("listening");
            speechInputBtn.innerHTML = `<i data-lucide="mic"></i>`;
            lucide.createIcons();
            
            if (event.error === 'not-allowed') {
                showToast("Microphone access denied by browser.", true);
            } else {
                showToast(`Speech input error: ${event.error}`, true);
            }
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            
            // Insert transcript at cursor position
            const startPos = sourceTextarea.selectionStart;
            const endPos = sourceTextarea.selectionEnd;
            const currentText = sourceTextarea.value;
            
            sourceTextarea.value = currentText.substring(0, startPos) + transcript + currentText.substring(endPos);
            
            sourceTextarea.focus();
            handleSourceInput();
        };
    }
    function toggleSpeechInput() {
        if (!recognition) return;
        if (isListening) {
            recognition.stop();
        } else {
            const currentSource = sourceLangSelect.value;
            // Use selected language or default to English
            recognition.lang = currentSource === 'auto' ? 'en-US' : currentSource;
            recognition.start();
        }
    }
    // 6. Text to Speech (Output Reader)
    function speakText() {
        const text = targetTextarea.value.trim();
        const targetLang = targetLangSelect.value;
        if (!text) {
            showToast("No translated text to speak.", true);
            return;
        }
        if (!('speechSynthesis' in window)) {
            showToast("Text-to-speech is not supported in this browser.", true);
            return;
        }
        // Toggle speech off if already speaking
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            ttsBtn.innerHTML = `<i data-lucide="volume-2" class="btn-icon"></i> <span>Speak Translation</span>`;
            lucide.createIcons();
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLang;
        // Try to match standard voices matching target language
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(voice => 
            voice.lang.toLowerCase() === targetLang.toLowerCase() || 
            voice.lang.toLowerCase().startsWith(targetLang.toLowerCase() + "-")
        );
        if (matchingVoice) {
            utterance.voice = matchingVoice;
        }
        // Animate button state
        ttsBtn.innerHTML = `<i data-lucide="square" class="btn-icon pulse-stop"></i> <span>Stop Speaking</span>`;
        lucide.createIcons();
        utterance.onend = () => {
            ttsBtn.innerHTML = `<i data-lucide="volume-2" class="btn-icon"></i> <span>Speak Translation</span>`;
            lucide.createIcons();
        };
        utterance.onerror = (e) => {
            console.error("Speech Synthesis Error:", e);
            ttsBtn.innerHTML = `<i data-lucide="volume-2" class="btn-icon"></i> <span>Speak Translation</span>`;
            lucide.createIcons();
        };
        window.speechSynthesis.speak(utterance);
    }
    // 7. Clipboard Copy
    async function copyToClipboard() {
        const text = targetTextarea.value.trim();
        if (!text) {
            showToast("No translation to copy.", true);
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            showToast("Translation copied to clipboard!");
            
            // Visual success indicator
            copyBtn.innerHTML = `<i data-lucide="check" class="btn-icon"></i> <span>Copied!</span>`;
            copyBtn.classList.add("success");
            lucide.createIcons();
            
            setTimeout(() => {
                copyBtn.innerHTML = `<i data-lucide="copy" class="btn-icon"></i> <span>Copy Text</span>`;
                copyBtn.classList.remove("success");
                lucide.createIcons();
            }, 1800);
        } catch (err) {
            console.error("Failed to copy:", err);
            showToast("Failed to copy translation", true);
        }
    }
    // 8. Swap Languages Action
    function swapLanguages() {
        const currentSource = sourceLangSelect.value;
        const currentTarget = targetLangSelect.value;
        if (currentSource === "auto") {
            const detected = detectedLangCode || "en";
            if (detected === currentTarget) {
                sourceLangSelect.value = currentTarget;
                targetLangSelect.value = "en";
            } else {
                sourceLangSelect.value = currentTarget;
                targetLangSelect.value = detected;
            }
        } else {
            sourceLangSelect.value = currentTarget;
            targetLangSelect.value = currentSource;
        }
        // Swap text box contents
        const sourceText = sourceTextarea.value.trim();
        const targetText = targetTextarea.value.trim();
        sourceTextarea.value = targetText;
        targetTextarea.value = sourceText;
        detectedLangBadge.classList.add("hidden");
        detectedLangCode = null;
        handleSourceInput();
    }
    // Connect Event Listeners
    sourceTextarea.addEventListener("input", handleSourceInput);
    translateBtn.addEventListener("click", translateText);
    swapLangsBtn.addEventListener("click", swapLanguages);
    
    clearTextBtn.addEventListener("click", () => {
        sourceTextarea.value = "";
        handleSourceInput();
        sourceTextarea.focus();
    });
    speechInputBtn.addEventListener("click", toggleSpeechInput);
    copyBtn.addEventListener("click", copyToClipboard);
    ttsBtn.addEventListener("click", speakText);
    // Initializations
    initLanguages();
    initSpeechToText();
    // Cache voice lists for SpeechSynthesis
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
});