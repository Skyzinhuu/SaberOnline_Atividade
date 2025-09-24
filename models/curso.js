export default class Curso {
   
    #id;
    #titulo;
    #descricao;
    #instrutor;
    #carga_horaria;
    #nivel;
    #preco;
    #vagas;

    constructor(id, titulo, descricao, instrutor, carga_horaria, nivel, preco, vagas) {
        this.#id = id;
        this.#titulo = titulo;
        this.#descricao = descricao;
        this.#instrutor = instrutor;
        this.#carga_horaria = carga_horaria;
        this.#nivel = nivel;
        this.#preco = preco;
        this.#vagas = vagas;
    }

   
    get id() {
        return this.#id;
    }

    get titulo() {
        return this.#titulo;
    }

    get descricao() {
        return this.#descricao;
    }

    get instrutor() {
        return this.#instrutor;
    }

    get carga_horaria() {
        return this.#carga_horaria;
    }

    get nivel() {
        return this.#nivel;
    }

    get preco() {
        return this.#preco;
    }

    get vagas() {
        return this.#vagas;
    }

    
    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descricao: this.#descricao,
            instrutor: this.#instrutor,
            carga_horaria: this.#carga_horaria,
            nivel: this.#nivel,
            preco: this.#preco,
            vagas: this.#vagas
        };
    }
}