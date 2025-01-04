// Tools 
const tools = document.querySelector(".open-tools");
const openTools = document.querySelector(".open-tools .open");
const closeTools = document.querySelector(".open-tools .close");
const toolsMenu = document.querySelector(".tools");

tools.addEventListener('click', () =>{
    if(toolsMenu.style.display === "none"){
        toolsMenu.style.display = 'flex';
        openTools.style.display = 'none';
        closeTools.style.display = 'flex';
    }else{
        toolsMenu.style.display = 'none';
        openTools.style.display = 'flex';
        closeTools.style.display = 'none';
    }
});

// Dropdown
const dropdownBtn = document.querySelector(".tool-btn.pen");
const dropdown = document.querySelector(".dropdown");

dropdownBtn.addEventListener('click', (event) =>{
    event.stopPropagation();
    const isDropdownOpen = dropdown.style.display == 'flex';
    dropdown.style.display = isDropdownOpen ? 'none' : 'flex';
});

document.addEventListener('click', (event) => {
    if(dropdown.style.display == 'flex' && !dropdown.contains(event.target) && !dropdownBtn.contains(event.target)){
        dropdown.style.display = 'none';
    }
});


// Icon Change
const toolBtn = document.querySelector(".tool-btn.pen span");
const toolDropdown = document.querySelector("#pen-dropdown");
const toolButtons = document.querySelectorAll(".dropdown-items-btn .other-tools");

const updateToolButtonIcon = (selectedTool) => {
    const icon = selectedTool.querySelector("i").cloneNode(true);
    toolBtn.innerHTML = "";
    toolBtn.appendChild(icon);
};


// Cursor Changing
const workspace = document.querySelector("body");

const updateCursor = (selectedTool) => {
    const iconElement = selectedTool.querySelector("i");
    const iconClass = iconElement.className.split(" ").pop();
    
    const fontAwesomeUnicode = getFontAwesomeUnicode(iconClass);
    if(!fontAwesomeUnicode){
        console.error(`Unable to find the Unicode for class ${iconClass}`);
        return;
    }
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.height = 32;
    canvas.width = 32;
    ctx.font = "16px FontAwesome";
    ctx.fillStyle = "black";
    ctx.textAlign = "top right";
    ctx.textBaseline = "right";
    ctx.fillText(fontAwesomeUnicode, canvas.width/2, canvas.height/2);
    const cursorUrl = canvas.toDataURL();
    workspace.style.cursor = `url(${cursorUrl}) 16 16, auto`;
};

const getFontAwesomeUnicode = (clasName) => {
    const unicodeMap = {
        "fa-pencil": "\uf304",
        "fa-highlighter": "\uf591",
        "fa-eraser": "\uf12d",
        "fa-circle": "\uf111",
        "fa-trash": "\uf1f8",
    };
    return unicodeMap[clasName] || null;
};

toolButtons.forEach((button) => {
    button.addEventListener('click', () =>{
        if(button.querySelector("i").classList.contains("fa-trash")){
            console.log("Erase All button is triggered");
            return;
        }
        toolButtons.forEach((btn) => btn.classList.remove("selected-tool"));
        button.classList.add("selected-tool");

        updateToolButtonIcon(button);
        updateCursor(button);
        // toolDropdown.classList.remove("open");
    });
})

// toolBtn.addEventListener("click", () =>{
//     toolDropdown.classList.toggle("open");
// })


// Live Chat
// const liveChatBtn = document.getElementById("live_chat");
// const chatSection = document.querySelector(".chat-section");

// liveChatBtn.addEventListener('click', () =>{
//     chatSection.style.display = (chatSection.style.display === "none" || chatSection.style.display === "") ? 'flex' : 'none';
// });