class Ship {
    constructor(type, length) {
        this.length = length;
        this.count = length;
        this.type = type;
        this.coordinates = [];
    }

    isSunk() {
        if (this.count === 0) { return true; }
    }
}

module.exports = Ship;