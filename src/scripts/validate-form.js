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
                    let res = inputValue.match(/[ ]+/g).length - vmWordOnly.length;
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
            if (inputValue.length === 0) {
                inputSpan.textContent = "Empty";
                inputSpan.style.color = "gray";
                inputSpan.style.opacity = 1;
            }
        });
    });
});