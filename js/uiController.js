// js/uiController.js
const uiController = {
    init: (canvas) => {
        const generateButton = document.getElementById('generateButton');
        generateButton.addEventListener('click', () => {
            uiController.handleGenerateClick(canvas);
        });

        const themeSelector = document.getElementById('themeSelector');
        const colorPreview = document.getElementById('colorPreview');
        
        // Populate theme selector
        uiController.populateThemeSelector(themeSelector);
        
        // Initialize with the first theme
        if (themeSelector.options.length > 0) {
            const initialTheme = themeSelector.options[0].value;
            uiController.applyTheme(initialTheme);
            uiController.updateColorPreview(colorPreview, uiController.currentColors);
        }
        
        themeSelector.addEventListener('change', () => {
            uiController.applyTheme(themeSelector.value);
            uiController.updateColorPreview(colorPreview, uiController.currentColors);
            uiController.handleThemeChange(canvas);
        });
    },

    currentColors: {},

    populateThemeSelector: (selector) => {
        // Clear existing options
        selector.innerHTML = '';
        
        // Create and add options for each theme
        Object.keys(themeRegistry.themes).forEach(themeName => {
            const option = document.createElement('option');
            option.value = themeName;
            option.textContent = themeName;
            selector.appendChild(option);
        });
        
        // Add random theme option
        const randomOption = document.createElement('option');
        randomOption.value = 'Random';
        randomOption.textContent = 'Random';
        selector.appendChild(randomOption);
    },
    
    updateColorPreview: (previewElement, colors) => {
        // Clear existing colors
        previewElement.innerHTML = '';
        
        if (!colors) return;
        
        // Create a color box for each color in the palette
        const colorKeys = ['primary', 'secondary', 'tertiary', 'accent', 'background'];
        colorKeys.forEach(key => {
            if (colors[key]) {
                const colorBox = document.createElement('div');
                colorBox.className = 'color-box';
                colorBox.style.backgroundColor = colors[key];
                previewElement.appendChild(colorBox);
            }
        });
    },

    applyTheme: (themeName) => {
        if (themeName === 'Random') {
            uiController.currentColors = uiController.generateRandomPalette();
        } else {
            uiController.currentColors = themeRegistry.themes[themeName];
            if (!uiController.currentColors) {
                uiController.currentColors = uiController.generateRandomPalette();
            }
        }
    },

    generateRandomPalette: () => {
        return {
            primary: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            secondary: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            tertiary: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            accent: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            background: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        }
    },

    handleGenerateClick: (canvas) => {
        canvasRenderer.drawPattern(canvas, uiController.getCurrentColors());
    },

    handleThemeChange: (canvas) => {
        canvasRenderer.drawPattern(canvas, uiController.getCurrentColors());
    },

    getCurrentColors: () => {
        if (!uiController.currentColors) {
            uiController.currentColors = uiController.generateRandomPalette();
        }
        return uiController.currentColors;
    }
};