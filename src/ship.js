class Ship {
    constructor(type, length) {
        this.length = length;
        this.count = 0;
        this.type = type;
        this.coordinates = [];
    }

    isSunk() {
        if (this.count === this.length) { return true; }
    }

    shipInfo(){
        document.getElementById('ship').innerHTML = `${this.type} (length ${this.length})`
    }
}

module.exports = Ship;