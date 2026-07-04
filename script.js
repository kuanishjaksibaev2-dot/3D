* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #0f0f0f;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow-x: hidden;
}

.app-container {
    text-align: center;
    max-width: 600px;
    width: 100%;
    padding: 20px;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.viewer-360 {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #1a1a1a;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    border: 1px solid #2a2a2a;
}

.viewer-360 img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
}

.hint {
    position: absolute;
    bottom: 15px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    color: #ccc;
    pointer-events: none;
    backdrop-filter: blur(4px);
}

.controls {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 15px;
}

button {
    background-color: #2a2a2a;
    color: white;
    border: 1px solid #3a3a3a;
    padding: 12px 24px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
}

button:hover {
    background-color: #3a3a3a;
}

button:active {
    transform: scale(0.95);
}
