// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Terminal Interface v2.7.3 [CLASSIFIED]
    console.log('%c[SYSTEM] Terminal Interface v2.7.3 initialized', 'color: #0f0');
    console.log('%c[WARNING] Unauthorized access will be traced and reported', 'color: #f00');

    const TERMINAL = {
        input: document.getElementById('command-input'),
        display: document.querySelector('.output'),
        prompt: 'user@dystopia:~$ ',
        bootSequence: [
            'Initializing memory banks...',
            'Loading command protocols...',
            'Establishing secure connection...',
            'Terminal ready.'
        ]
    };

    // Execute boot sequence
    TERMINAL.bootSequence.forEach((msg, i) => {
        setTimeout(() => appendOutput(`[BOOT] ${msg}`), i * 500);
    });

    // Command Protocol Database
    const COMMAND_PROTOCOLS = {
        'help': '[SYS] Available protocols: help | next | home | chapters | clear',
        'next': () => {
            appendOutput('[NAV] Initiating chapter transition...');
            setTimeout(() => window.location.href = 'chapter2.html', 800);
        },
        'home': () => {
            appendOutput('[NAV] Returning to root directory...');
            setTimeout(() => window.location.href = 'index.html', 800);
        },
        'clear': () => {
            TERMINAL.display.innerHTML = '';
            appendOutput('[SYS] Terminal buffer cleared');
        },
        'chapters': '[DATA] Archive contents:\n' +
                    '├── Chapter_01: Illusion_of_Choice.dat\n' +
                    '├── Chapter_02: [ENCRYPTED]\n' +
                    '└── Additional_chapters: [RESTRICTED_ACCESS]'
    };

    TERMINAL.input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = TERMINAL.input.value.trim().toLowerCase();
            appendOutput(`${TERMINAL.prompt}${cmd}`);
            
            if (COMMAND_PROTOCOLS[cmd]) {
                if (typeof COMMAND_PROTOCOLS[cmd] === 'function') {
                    COMMAND_PROTOCOLS[cmd]();
                } else {
                    appendOutput(COMMAND_PROTOCOLS[cmd]);
                }
            } else {
                appendOutput(`[ERROR] Invalid protocol: ${cmd}`);
                appendOutput('[ERROR] Type "help" for available protocols');
            }
            TERMINAL.input.value = '';
        }
    });

    function appendOutput(text) {
        const timestamp = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.innerHTML = `<span style="color: #666">[${timestamp}]</span> ${text}`;
        TERMINAL.display.appendChild(line);
        TERMINAL.display.scrollTop = TERMINAL.display.scrollHeight;
    }

    // Advanced Text Rendering Protocol with Corruption Simulation
    const TEXT_RENDERER = {
        targets: document.querySelectorAll('.chapter-text, .intro'),
        baseLatency: 10, // Reduced from 20 for faster typing
        corruptionChars: '@#$%&*░▒▓█╔╗╚╝║═╣╠╬│┌┐└┘├┤┬┴┼'.split(''),
        noiseThreshold: 0.15,
        delayProbability: 0.01,
        cursorChar: '|'
    };

    TEXT_RENDERER.targets.forEach(target => {
        const originalData = target.innerText;
        target.innerText = '';
        let dataIndex = 0;

        function simulateCorruption() {
            const corruptedData = target.innerText.split('');
            const corruptionPoint = Math.floor(Math.random() * corruptedData.length);
            corruptedData[corruptionPoint] = TEXT_RENDERER.corruptionChars[
                Math.floor(Math.random() * TEXT_RENDERER.corruptionChars.length)
            ];
            target.innerText = corruptedData.join('');

            setTimeout(() => {
                target.innerText = originalData.substring(0, dataIndex) + TEXT_RENDERER.cursorChar;
            }, 100);
        }

        function renderText() {
            if (dataIndex < originalData.length) {
                const latencyVariation = Math.random() * 50; // Reduced from 100 for more consistent speed
                const currentLatency = TEXT_RENDERER.baseLatency + latencyVariation;

                target.innerText = originalData.substring(0, dataIndex) + TEXT_RENDERER.cursorChar;
                dataIndex++;

                if (Math.random() < TEXT_RENDERER.noiseThreshold) {
                    simulateCorruption();
                }

                if (Math.random() < TEXT_RENDERER.delayProbability) {
                    setTimeout(renderText, currentLatency + 500); // Reduced from 1000
                } else {
                    setTimeout(renderText, currentLatency);
                }
            } else {
                // Remove cursor at the end
                target.innerText = originalData;
            }
        }

        renderText();
    });

    // Audio Feedback Protocol
    const AUDIO_PROTOCOL = document.getElementById('typing-sound');
    if (AUDIO_PROTOCOL) {
        AUDIO_PROTOCOL.volume = 0.05;
        
        TEXT_RENDERER.targets.forEach(target => {
            const data = target.innerText;
            target.innerText = '';
            let index = 0;

            function renderWithAudio() {
                if (index < data.length) {
                    target.innerText = data.substring(0, index) + TEXT_RENDERER.cursorChar;
                    if (Math.random() < 0.7) {
                        AUDIO_PROTOCOL.currentTime = 0;
                        AUDIO_PROTOCOL.play();
                    }
                    index++;
                    setTimeout(renderWithAudio, TEXT_RENDERER.baseLatency + Math.random() * 50); // Reduced from 100
                } else {
                    target.innerText = data;
                }
            }

            renderWithAudio();
        });
    }
});
