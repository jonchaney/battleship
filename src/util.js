// remove element from the dom
const remove = (id) => {
    let element = document.getElementById(`${id}`);
    element.parentNode.removeChild(element);
};

// toggle display style of element
const toggleElement = (id) => {
    let element = document.getElementById(`${id}`);
    if (element.style.display === "none") {
        element.style.display = "";
    } else {
        element.style.display = 'none';
    }
}

const compareArray = (arrayA, arrayB) => {
    if (arrayA.join() === arrayB.join()) {
        return true;
    } else {
        return false;
    }
}

const changeInnerHtml = (id, str) => {
    document.getElementById(`${id}`).innerHTML = `${str}`;
}

const clearInnerHtml = (id) => {
    document.getElementById(id).innerHTML = "";
}

exports.remove = remove;
exports.toggleElement = toggleElement;
exports.compareArray = compareArray;
exports.changeInnerHtml = changeInnerHtml;
exports.clearInnerHtml = clearInnerHtml;