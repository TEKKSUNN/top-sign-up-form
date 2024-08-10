document.addEventListener("DOMContentLoaded", () => {
    const PHONE_REGEX = "/^[\+][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/";
    const INPUTS = Array.from(document.querySelectorAll("input"));
    const INPUT_SPANS = Array.from(document.querySelectorAll("input + span"));
    INPUT_SPANS.forEach((SpanElement) => {
        SpanElement.textContent = "Empty";
        SpanElement.style.color = "gray";
    });
    INPUTS.forEach((InputElement, InputIndex) => {
        InputElement.addEventListener("input", (e) => {
            target = e.target;
            typeValue = target.attributes["type"]["nodeValue"];
            targetID = target.id;
            inputValue = target.value;
            inputSpan = INPUT_SPANS[InputIndex];
            if (typeValue === "text" && (targetID === "first-name" || targetID === "last-name")) {
                const valueMatch = inputValue.match(/([A-Z])([a-z]+)*(\s+([A-Z])([a-z]+)*)*/);
                if (valueMatch === null) {
                    inputSpan.textContent = "Invalid";
                    inputSpan.style.color = "red";
                    inputSpan.style.opacity = 1;
                }
                else {
                    const vmWordOnly = inputValue.match(/([A-Z])([a-z]+)*/g);
                    let charCount = 0;
                    vmWordOnly.map((value) => charCount += value.length);
                    let res;
                    try {
                        res = inputValue.match(/[ ]+/g).length - vmWordOnly.length;
                    } catch (TypeError) {
                        res = -1;
                    }
                    if (inputValue.length === charCount && inputValue.match(/[ ]+/g) === null || res === -1) {
                        inputSpan.style.opacity = 0;
                    }
                    else {
                        inputSpan.textContent = "Invalid";
                        inputSpan.style.color = "red";
                        inputSpan.style.opacity = 1;
                    }
                }
            }
            else if (typeValue === "email" && targetID === "email") {
                let valueMatch;
                let charCount;
                try {
                    valueMatch = inputValue.match(/[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/);
                    charCount = valueMatch[0].length;
                } catch (TypeError) {
                    valueMatch = null;
                    charCount = inputValue.length;
                }
                console.log(valueMatch);
                if (valueMatch !== null && valueMatch.length > 0 && (charCount - inputValue.length === 0)) {
                    inputSpan.style.opacity = 0;
                }
                else {
                    inputSpan.textContent = "Invalid";
                    inputSpan.style.color = "red";
                    inputSpan.style.opacity = 1;
                }
            }
            else if (typeValue === "tel" && targetID === "phone-number") {
                let valueMatch;
                try {
                    valueMatch = inputValue.match(/^\(?\+\d{1,3}\)?[ ]?\d{3}[ -]?\d{3}[ -]?\d{4}$/);
                } catch (TypeError) {
                    valueMatch = null;
                }
                if (valueMatch !== null && valueMatch.length === 1) {
                    target.style.outlineColor = "blue";
                    inputSpan.style.opacity = 0;
                }
                else {
                    target.style.outlineColor = "red";
                    inputSpan.textContent = "Invalid";
                    inputSpan.style.color = "red";
                    inputSpan.style.opacity = 1;
                }
            }
            else if (typeValue === "password" && (targetID === "password" || targetID === "confirm-password")) {
                passwordNode = document.getElementById("password");
                confirmPassNode = document.getElementById("confirm-password");
                INPUT_SPANS_PASS = Array.from(document.querySelectorAll("input[type=\"password\"] + span"));
                passwordValue = passwordNode.value;
                confirmPassValue = confirmPassNode.value;
                if (inputValue.length >= 8) {
                    inputSpan.style.opacity = 0;
                }
                else {
                    inputSpan.textContent = "Invalid";
                    inputSpan.style.color = "red";
                    inputSpan.style.opacity = 1;
                    if (targetID === "password" && inputValue.length === 0 && confirmPassValue.length === 0) {
                        console.log(1);
                        passwordNode.style.borderColor = "#E5E7EB";
                        confirmPassNode.style.borderColor = "#E5E7EB";
                        passwordNode.style.outlineColor = "blue";
                        confirmPassNode.style.outlineColor = "blue";
                        
                        INPUT_SPANS_PASS.map((spanElement) => {
                            spanElement.textContent = "Empty";
                            spanElement.style.color = "gray";
                            spanElement.style.opacity = 1;
                        });
                        return;
                    }
                    else if (targetID === "confirm-password" && inputValue.length === 0 && passwordValue.length === 0) {
                        console.log(2);
                        passwordNode.style.borderColor = "#E5E7EB";
                        confirmPassNode.style.borderColor = "#E5E7EB";
                        passwordNode.style.outlineColor = "blue";
                        confirmPassNode.style.outlineColor = "blue";
                        
                        INPUT_SPANS_PASS.map((spanElement) => {
                            spanElement.textContent = "Empty";
                            spanElement.style.color = "gray";
                            spanElement.style.opacity = 1;
                        });
                        return;
                    }
                    target.style.borderColor = "#E5E7EB";
                    target.style.outlineColor = "red";
                    return;
                }
                if (passwordValue !== confirmPassValue) {
                    passwordNode.style.outlineColor = "transparent";
                    confirmPassNode.style.outlineColor = "transparent";
                    passwordNode.style.borderColor = "red";
                    confirmPassNode.style.borderColor = "red";
                    INPUT_SPANS_PASS.map((spanElement) => {
                        spanElement.textContent = "* Passwords do not match";
                        spanElement.style.color = "red";
                        spanElement.style.opacity = 1;
                    })
                    
                }
                else {
                    console.log(3);
                    INPUT_SPANS_PASS.map((spanElement) => {
                        spanElement.textContent = " ";
                        spanElement.style.opacity = 0;
                    });
                    passwordNode.style.borderColor = "#E5E7EB";
                    confirmPassNode.style.borderColor = "#E5E7EB";
                    passwordNode.style.outlineColor = "blue";
                    confirmPassNode.style.outlineColor = "blue";
                }
            }
            if (inputValue.length === 0) {
                inputSpan.textContent = "Empty";
                inputSpan.style.color = "gray";
                inputSpan.style.opacity = 1;
            }
        });
    });
});