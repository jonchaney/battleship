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
        let ship = document.getElementById('ship');
        if (!ship) { // if it does not exist create a new one for testing
            ship = document.createElement('p');;
        }
        ship.innerHTML = `${this.type} (length ${this.length})`
    }
}

module.exports = Ship;