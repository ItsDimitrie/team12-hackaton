/** Class for a team of Pokémon. */
class Team {
    /** Create a team. */
    constructor() {
        this.pokemon = [];
    }

    /**
     * Get the length of the team.
     * @returns {number} The length of the team.
     */
    get length() {
        return this.pokemon.length;
    }

    /**
     * Get the team.
     * @returns {Array} The team.
     */
    get pokemon() {
        return this.pokemon;
    }

    /**
     * Return a specific Pokémon from the team.
     * @param {number} index The index of the Pokémon to get.
     * @returns {object} The Pokémon at the given index.
     */
    index(index) {
        if (this.indexInTeam(index)) {
            return this.pokemon[index];
        }
    }

    /**
     * Add a Pokémon to the team.
     * @param {object} pokemon The Pokémon to add.
     */
    add(pokemon) {
        if (this.length < 6) {
            this.pokemon.push(pokemon);
        }
    }

    /**
     * Replace a Pokémon in the team.
     * @param {number} index The index of the Pokémon to replace.
     * @param {object} pokemon The Pokémon to replace the old one with.
     */
    order(oldIndex, newIndex) {
        if (this.indexInTeam(oldIndex) && this.indexInTeam(newIndex)) {
            let pokemon = this.pokemon[oldIndex];
            this.pokemon.splice(oldIndex, 1);
            this.pokemon.splice(newIndex, 0, pokemon);
        }
    }

    /**
     * Remove a Pokémon from the team.
     * @param {number} index The index of the Pokémon to remove.
     */
    remove (index) {
        if (this.indexInTeam(index)) {
            this.pokemon.splice(index, 1);
        }
    }

    /**
     * Check if an index is in the team.
     * @param {number} index the index of the Pokémon to check
     * @returns {boolean} true if the index is in the team, false otherwise
     */
    indexInTeam(index) {
        return index >= 0 && index < this.length;
    }
}