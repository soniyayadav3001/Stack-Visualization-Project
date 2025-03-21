// Variable Declaration
const push = document.querySelector(".push");
const pop = document.querySelector(".pop");
const reset = document.querySelector(".reset");
const bucket = document.querySelector(".main-stack-bucket");
const input = document.querySelector(".text");
const message = document.querySelector(".message");
const messageBox = document.querySelector(".message-box");
const box = document.querySelectorAll(".box");
const stack = [];
const MAX_STACK_SIZE = 5; // Adjustable Stack Size

// Disable all buttons
const buttonDisable = () => {
    push.disabled = true;
    push.classList.add("disable-button");
    pop.disabled = true;
    pop.classList.add("disable-button");
    reset.disabled = true;
    reset.classList.add("disable-button");
    input.disabled = true;
};

// Enable all buttons
const buttonEnable = () => {
    push.disabled = false;
    push.classList.remove("disable-button");
    pop.disabled = false;
    pop.classList.remove("disable-button");
    reset.disabled = false;
    reset.classList.remove("disable-button");
    input.disabled = false;
};

// Show Error Message
const showErrorMessage = (msg) => {
    message.innerHTML = msg;
    messageBox.classList.add("error-message");
    setTimeout(() => {
        messageBox.classList.remove("error-message");
    }, 1200);
};

// When the push button is clicked
push.addEventListener("click", () => {
    if (input.value.trim() === "") {
        showErrorMessage("Please Enter a value.");
        return;
    }

    if (stack.length >= MAX_STACK_SIZE) {
        input.value = "";
        showErrorMessage("Stack Overflow");
        return;
    }

    const itemValue = input.value.trim();
    stack.push(itemValue);

    // Creating a new stack element
    const element = document.createElement("div");
    element.classList.add("ele");
    element.innerText = itemValue;
    bucket.appendChild(element);

    // Update the top
    box[0].innerHTML = stack[stack.length - 1];

    // Clear input field
    input.value = "";

    // Adding push animation
    element.classList.add("ele-add");

    buttonDisable();

    setTimeout(() => {
        element.classList.remove("ele-add");

        // Update Last Pushed Item Value
        box[1].innerHTML = itemValue;

        message.innerHTML = `Item ${itemValue} is Pushed.`;

        buttonEnable();
    }, 1500);
});

// When the pop button is clicked
pop.addEventListener("click", () => {
    if (stack.length === 0) {
        showErrorMessage("Stack Underflow");
        return;
    }

    // Adding pop animation
    const lastElement = bucket.lastElementChild;
    lastElement.classList.add("ele-remove");

    buttonDisable();

    setTimeout(() => {
        bucket.removeChild(lastElement);
        const itemValue = stack.pop();

        // Updating the last popped item
        box[2].innerHTML = itemValue;

        // Updating the Top
        box[0].innerHTML = stack.length === 0 ? "" : stack[stack.length - 1];

        message.innerHTML = `Item ${itemValue} is Popped.`;

        buttonEnable();
    }, 1500);
});

// When the reset button is clicked
reset.addEventListener("click", () => {
    stack.length = 0; // Empty the stack array
    box[0].innerHTML = "";
    box[1].innerHTML = "";
    box[2].innerHTML = "";
    message.innerHTML = "";
    input.value = ""; // Clear input field

    while (bucket.firstChild) {
        bucket.removeChild(bucket.firstChild);
    }
});
