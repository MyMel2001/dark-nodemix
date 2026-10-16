(function () {

// List of keyword patterns to hunt for in class names
    const colorKeywords = ["white", "black", "light", "dark", "bg-", "text-gray"];

    function stripColorClasses() {
        // Grab all elements on the page that have a class attribute
        const elements = document.querySelectorAll('[class]');
        
        elements.forEach(el => {
            const classList = el.className;
            if (typeof classList !== 'string') return;

            // Split classes by whitespace
            let classes = classList.split(/\s+/);
            
            // Filter out classes that match our color keywords
            let modified = false;
            classes = classes.filter(cls => {
                const lower = cls.toLowerCase();
                const isColorClass = colorKeywords.some(keyword => lower.includes(keyword));
                if (isColorClass) modified = true;
                return !isColorClass; // keep if NOT a color class
            });

            // If we stripped any classes, update the element's class list
            if (modified) {
                el.className = classes.join(' ');
            }
        });
    }

    const styleId = "quick-dark-custom-style";

    const css = `

       /* 1. Global clean inversion for layout and text */
        html {
            background-color: #111 !important;
        }

        /* 2. Base structural colors */
        *:not( img, video, canvas, picture, svg, div, span, [class*="avatar"], [class*="logo"] , [id*="sample"], [id*="value"]) {
            background-color: rgba(25, 25, 25, 0.25)  !important;
            color: #e2e2ce !important;
        }
        
        div:not([id*="sample"], [id*="value"]) , span:not([class*="avatar"],  [id*="sample"], [id*="value"])  {
            background-color: rgba(25, 25, 25, 0.25)  !important;
            color: #e2e2ce !important;
        }
        /* 3. Keep media elements looking natural (double-invert to correct colors) */
        img,, canvas, picture, svg, iframe, [class*="avatar"], [class*="logo"] {
            filter: brightness(64%) contrast(94%) !important;
        }
        
        /* Slight orange tint on images/svgs */
        img, svg {
            filter: sepia(50%) hue-rotate(-15deg) saturate(150%);
        }
    `;

    function injectStyle() {
    
        //Strip all color classes
        if (document.documentElement) {
                stripColorClasses();
            }
        document.addEventListener("DOMContentLoaded", stripColorClasses);
        // Safe check that works even at document_start
        if (document.getElementById(styleId)) return true;

        const target = document.documentElement || document.body;
        if (target) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = css;
            target.appendChild(style);
            return true;
        }
        return false;
    }

    // 1. Try injecting immediately (Crucial for document_start to prevent white flash)
    const success = injectStyle();

    // 2. If it failed because documentElement/head wasn't ready, set up listeners
    if (!success) {
        // Use MutationObserver as the fastest possible backup before DOMContentLoaded
        const observer = new MutationObserver(() => {
            if (injectStyle()) {
                observer.disconnect();
            }
        });

        observer.observe(document, { childList: true, subtree: true });

        // Final fallback just in case
        document.addEventListener("DOMContentLoaded", () => {
            injectStyle();
            observer.disconnect();
        });
    }
})();

