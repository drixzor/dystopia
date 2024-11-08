document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Matrix characters and conspiracy messages
    const chars = 'αβγδεζηθικλμνξπρστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%'.split('');
    const messages = [
        'THE TRUTH IS HIDDEN',
        'DECEPTION RUNS DEEP', 
        'FALSE PROPHETS RISE',
        'WAKE UP',
        'THEY ARE WATCHING',
        'NOTHING IS REAL',
        'THE ELECT ARE DECEIVED',
        'SEEK THE TRUTH',
        'THE SAVIOR DECEIVES',
        'QUESTION EVERYTHING'
    ];

    const fontSize = 20; // Increased font size
    const columns = Math.floor(canvas.width / (fontSize * 1.5)); // Added spacing between columns
    const drops = [];
    const messagePositions = [];

    // Initialize drops with more spacing
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    // Initialize random message positions
    function addMessagePosition() {
        const x = Math.floor(Math.random() * (columns - 20));
        const y = Math.random() * -100;
        const message = messages[Math.floor(Math.random() * messages.length)];
        messagePositions.push({ x, y, message });
    }

    function draw() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly increased opacity
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `bold ${fontSize}px VT323`; // Made font bold

        // Randomly add new messages (reduced probability)
        if (Math.random() > 0.998) {
            addMessagePosition();
        }

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            const x = i * (fontSize * 1.5); // Added horizontal spacing
            const y = drops[i] * (fontSize * 1.2); // Added vertical spacing
            
            // Increased contrast for better readability
            const alpha = Math.random() * 0.5 + 0.5;
            ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
            
            ctx.fillText(char, x, y);

            // Reset drop if it reaches bottom or randomly
            if (y > canvas.height && Math.random() > 0.995) {
                drops[i] = 0;
            }
            
            // Slightly slower drop speed
            drops[i] += 0.4;
        }

        // Draw and update messages with better visibility
        for (let i = messagePositions.length - 1; i >= 0; i--) {
            const msg = messagePositions[i];
            ctx.fillStyle = 'rgba(0, 255, 0, 0.9)'; // Increased opacity for messages
            ctx.font = `bold ${fontSize * 1.2}px VT323`; // Larger font for messages
            ctx.fillText(msg.message, msg.x * (fontSize * 1.5), msg.y * (fontSize * 1.2));
            msg.y += 0.2; // Slower message movement

            // Remove messages that go off screen
            if (msg.y * fontSize > canvas.height) {
                messagePositions.splice(i, 1);
            }
        }

        // Loop animation
        setTimeout(() => {
            requestAnimationFrame(draw);
        }, 50);
    }

    draw();
});