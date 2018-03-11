const remove = (id) => {
    let element = document.getElementById(`${id}`);
    element.parentNode.removeChild(element);
};

exports.remove = remove;