document.addEventListener('DOMContentLoaded', () => {
    const TERMINAL = {
        input: document.getElementById('command-input'),
        display: document.querySelector('.output'),
        prompt: 'user@dystopia:~$ ',
        bootSequence: [
            'BOOT: Systems check...',
            'WARNING: Connection unstable',
            'BOOT: Neural interface active',
            'BOOT: Reality filters engaged',
            'Terminal ready. Welcome to the truth.',
            'HINT: Progress lies ahead...',
            'HINT: To advance, one must know the way forward...',
            '... CONNECTION ESTABLISHED ...'
        ],
        hints: [
            'The path forward lies in progression...',
            'To advance, one must take the ____ step',
            'What comes after now? The ____ moment',
            'Moving forward requires the right command',
            'The future lies ahead, in what comes ____',
            'Progress demands we look to what\'s ____',
            'After present comes...'
        ],
        glitchChars: '!@#$%^&*[]{}|;:,.<>?/~αβγδεζηθικλμνξπρστυφχψω',
        transitionMessages: [
            'REDIRECTING NEURAL PATHWAY',
            'LOADING NEXT MEMORY FRAGMENT',
            'ESTABLISHING CONNECTION',
            'ACCESSING DATA STREAM',
            'REALITY SHIFT IN PROGRESS',
            'DISSOLVING CURRENT INSTANCE',
            'QUANTUM TUNNEL ENGAGED'
        ]
    };

    // Utility functions
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    
    const createGlitchText = (text, intensity = 0.9) => {
        return text.split('').map(char => 
            Math.random() > intensity ? 
            getRandomItem(TERMINAL.glitchChars) : 
            char
        ).join('');
    };

    // Create transition overlay
    function createTransitionOverlay() {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: '1000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'VT323, monospace',
            fontSize: '2em',
            color: '#0F0',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '2px'
        });
        document.body.appendChild(overlay);
        return overlay;
    }

    // Handle initial page setup
    function handleInitialPage() {
        const isInitialPage = !document.querySelector('.container');
        if (isInitialPage) {
            document.addEventListener('keydown', (e) => {
                const key = e.key.toLowerCase();
                if (key === 'y') {
                    transitionToChapter('chapter1.html');
                }
            });
        }
    }

    // Enhanced transition effect
    function transitionToChapter(url) {
        const container = document.querySelector('.container') || document.querySelector('.terminal');
        const overlay = createTransitionOverlay();
        let currentMsg = getRandomItem(TERMINAL.transitionMessages);
        
        container.style.transition = 'all 0.3s ease';
        container.style.opacity = '0';
        container.style.transform = 'scale(0.97)';
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.textContent = currentMsg;
            
            let glitchCount = 0;
            const glitchEffect = setInterval(() => {
                container.style.transform = `scale(0.97) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                overlay.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                
                if (Math.random() > 0.7) {
                    overlay.textContent = createGlitchText(currentMsg, 0.8);
                    setTimeout(() => {
                        overlay.textContent = currentMsg;
                    }, 50);
                }
                
                glitchCount++;
                if (glitchCount > 10) {
                    clearInterval(glitchEffect);
                    window.location.href = url;
                }
            }, 100);
        }, 300);
    }

    // Navigation handling
    function getCurrentChapter() {
        const path = window.location.pathname;
        const match = path.match(/chapter(\d+)\.html/);
        return match ? parseInt(match[1]) : 0;
    }

    function getNextChapterUrl() {
        const currentChapter = getCurrentChapter();
        return currentChapter === 0 ? 'chapter1.html' : `chapter${currentChapter + 1}.html`;
    }

    function getPreviousChapterUrl() {
        const currentChapter = getCurrentChapter();
        return currentChapter <= 1 ? 'index.html' : `chapter${currentChapter - 1}.html`;
    }

    function showRandomHint() {
        if (!TERMINAL.display) return;
        const hint = getRandomItem(TERMINAL.hints);
        appendOutput('[SYSTEM] ' + hint, '#0F0');
    }

    // Command system
    const COMMANDS = {
        'help': () => {
            appendOutput('[SYSTEM] To progress is to move forward...', '#0F0');
            setTimeout(showRandomHint, 1000);
        },
        'next': () => {
            appendOutput('[NAV] Initiating neural pathway shift...');
            transitionToChapter(getNextChapterUrl());
        },
        'prev': () => {
            appendOutput('[NAV] Reverting to previous memory state...');
            transitionToChapter(getPreviousChapterUrl());
        },
        'home': () => {
            appendOutput('[NAV] Emergency return protocol initiated...');
            transitionToChapter('index.html');
        },
        'clear': () => {
            if (TERMINAL.display) {
                TERMINAL.display.innerHTML = '';
                appendOutput('[SYS] Terminal buffer purged');
            }
        },
        'status': () => {
            appendOutput('[STATUS] System Diagnostics:');
            appendOutput('├── Neural Interface: ACTIVE');
            appendOutput('├── Reality Filters: ENGAGED');
            appendOutput('├── Memory Banks: ONLINE');
            appendOutput('└── Connection Status: UNSTABLE');
        }
    };

    // Terminal output
    function appendOutput(text, color = '#ccc') {
        if (!TERMINAL.display) return;
        const timestamp = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.innerHTML = `<span style="color: #666">[${timestamp}]</span> <span style="color: ${color}">${text}</span>`;
        line.style.textAlign = 'left';
        TERMINAL.display.appendChild(line);
        TERMINAL.display.scrollTop = TERMINAL.display.scrollHeight;
    }

    // Command input handling
    if (TERMINAL.input) {
        let incorrectAttempts = 0;
        
        TERMINAL.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = TERMINAL.input.value.trim().toLowerCase();
                appendOutput(`${TERMINAL.prompt}${cmd}`, '#0F0');
                
                if (COMMANDS[cmd]) {
                    typeof COMMANDS[cmd] === 'function' 
                        ? COMMANDS[cmd]() 
                        : appendOutput(COMMANDS[cmd]);
                } else {
                    incorrectAttempts++;
                    if (incorrectAttempts >= 3) {
                        appendOutput('[HINT] The future beckons... What comes next?', '#FFA500');
                        incorrectAttempts = 0;
                    } else {
                        const responses = [
                            'Not quite. Think about progression...',
                            'Close, but how does one move forward?',
                            'Almost there. What comes after now?',
                            'Think ahead. What\'s the next step?'
                        ];
                        appendOutput(`[ERROR] ${getRandomItem(responses)}`, '#FFA500');
                    }
                }
                TERMINAL.input.value = '';
            }
        });

        // Show periodic hints
        setInterval(showRandomHint, 20000);
    }

    // Initialize nav buttons
    function setupNavButtons() {
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (button.hasAttribute('href')) {
                    transitionToChapter(button.getAttribute('href'));
                } else {
                    const type = button.textContent.toLowerCase().includes('previous') ? 'prev' : 'next';
                    COMMANDS[type]();
                }
            });
        });
    }

    // Text rendering
    const renderText = () => {
        document.querySelectorAll('.chapter-text, .intro').forEach(target => {
            const text = target.innerText;
            target.style.textAlign = 'left';
            target.innerHTML = '';
            
            let index = 0;
            const interval = setInterval(() => {
                if (index <= text.length) {
                    if (Math.random() > 0.95) {
                        target.innerHTML = text.substring(0, index) + 
                            getRandomItem(TERMINAL.glitchChars) +
                            '█';
                        setTimeout(() => {
                            target.innerHTML = text.substring(0, index) + '█';
                        }, 50);
                    } else {
                        target.innerHTML = text.substring(0, index) + '█';
                    }
                    index++;
                } else {
                    clearInterval(interval);
                    target.innerHTML = text;
                }
            }, 20);
        });
    };

    // Initialize
    function init() {
        handleInitialPage();
        setupNavButtons();
        renderText();
        
        if (TERMINAL.display) {
            TERMINAL.bootSequence.forEach((msg, i) => {
                setTimeout(() => {
                    const glitchedMsg = createGlitchText(msg);
                    appendOutput(glitchedMsg, '#0F0');
                    setTimeout(() => appendOutput(msg, '#0F0'), 100);
                    
                    if (i === TERMINAL.bootSequence.length - 1) {
                        setTimeout(() => {
                            appendOutput('[SYSTEM] To continue your journey, you must progress...', '#0F0');
                            showRandomHint();
                        }, 1000);
                    }
                }, i * 400);
            });
        }
    }

    // Start the system
    init();
});