class Pokemon {
    constructor(id, name, types, evolvesFromId, evolvesToId) {
        this.id = id;
        this.name = name;
        this.types = types;
        this.evolvesFromId = evolvesFromId;
        this.evolvesToId = evolvesToId;
    }
}

module.exports = Pokemon;
