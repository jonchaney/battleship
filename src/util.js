const remove = (id) => {
    let element = document.getElementById(`${id}`);
    element.parentNode.removeChild(element);
};

const toggleElement = (id) => {
    let element = document.getElementById(`${id}`);
    if (element.style.display === "none") {
        element.style.display = "";
    } else {
        element.style.display = 'none';
    }
}

exports.remove = remove;
exports.toggleElement = toggleElement;