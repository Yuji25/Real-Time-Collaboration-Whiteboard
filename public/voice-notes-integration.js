document.addEventListener('DOMContentLoaded', () => {
    const voiceBtn = document.getElementById('voice');
    const voiceStatus = document.getElementById('voice-status');

    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Sorry, your browser doesn't support the Web Speech API.");
        voiceBtn.disabled = true;
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set the language
    recognition.interimResults = false; // Get final results only
    recognition.continuous = false; // Stop automatically after one input

    let isRecording = false;

    // Toggle recording
    voiceBtn.addEventListener('click', () => {
        if (isRecording) {
            recognition.stop();
            voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Start Recording';
            voiceStatus.style.display = 'block';
            voiceStatus.textContent = 'Recording stopped.';
        } else {
            recognition.start();
            voiceBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop Recording';
            voiceStatus.style.display = 'block';
            voiceStatus.textContent = 'Listening...';
        }
        isRecording = !isRecording;
    });

    // Handle recognition results
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;

        // Display transcription in the voice-status div
        voiceStatus.textContent = `Voice Note: ${transcript}`;
    });

    // Handle recognition errors
    recognition.addEventListener('error', (event) => {
        console.error('Recognition error:', event.error);
        voiceStatus.textContent = `Error: ${event.error}`;
        setTimeout(() => {
            voiceStatus.style.display = 'none';
        }, 3000);
    });

    // Stop recording on end
    recognition.addEventListener('end', () => {
        if (isRecording) {
            recognition.stop();
            voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Start Recording';
            voiceStatus.style.display = 'block';
            voiceStatus.textContent = 'Recording stopped.';
            isRecording = false;
        }
    });
});
