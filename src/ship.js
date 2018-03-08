class Ship {
    constructor(type, length) {
        this.length = length;
        this.type = type;
        this.coordinates = [];
    }

    isSunk() {
        if (this.length === 0) { return `You sunk my ${this.type}!`}
    }

}

module.exports = Ship;