class Pokemon {
    constructor(id, name, type, evolvesFromId, evolvesToId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.evolvesFromId = evolvesFromId;
        this.evolvesToId = evolvesToId;
    }
}

module.exports = Pokemon;
