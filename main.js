const colorPickInput = document.getElementById("color-pick");
const schemeInput = document.getElementById("scheme");
const getSchemeBtn = document.getElementById("get-scheme-btn");
const colorsSection = document.querySelector(".colors");
const colorDivs = document.getElementsByClassName("color");
const colorNameDivs = document.getElementsByClassName("color-name");
const copyTextEl = document.querySelector(".copy-text");

// Event listener to "Get color scheme" button
getSchemeBtn.addEventListener("click", function () {
    // Get the color hex code without "#"
    const hexCode = colorPickInput.value.substring(1);
    // Get the mode of the scheme
    const schemeMode = schemeInput.value;

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${schemeMode}&count=5`)
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.colors.length; i++) {
                // Set the background color of the div with class "color" with color from API
                colorDivs[i].style.backgroundColor = data.colors[i].hex.value;
                // Add text to div with class "color-name" with color hex code from API
                colorNameDivs[i].textContent = data.colors[i].hex.value;
            }
        });
});

// Event listener to "color hex code" text
colorsSection.addEventListener("click", function (event) {
    if (event.target.classList.contains("color-name")) {
        // Copy the color hex code to the clipboard
        navigator.clipboard.writeText(event.target.textContent);
        // Set display "block" for the sliding up copy text element
        copyTextEl.style.display = "block";
        // Event listener when the animation ends to set display "none" for the sliding up copy text element
        copyTextEl.addEventListener("animationend", function () {
            copyTextEl.style.display = "none";
        });
    }
});
