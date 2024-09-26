class Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        this._nombre = nombre;
        this._edad = edad;
        this._img = img;
        this._comentarios = comentarios;
        this._sonido = sonido;
    }

    get nombre() {
        return this._nombre;
    }

    get edad() {
        return this._edad;
    }

    get img() {
        return this._img;
    }

    //SI  no agrego el get de comentarios no me lo rellena en la tabla ni modal
    get comentarios() {
        return this._comentarios;
    }
    
    get sonido() {
        return this._sonido;
    }
}

class Leon extends Animal {
    rugir() {
        return this.sonido;
    }
}

class Lobo extends Animal {
    aullar() {
        return this.sonido;
    }
}

class Oso extends Animal {
    gruñir() {
        return this.sonido;
    }
}

class Serpiente extends Animal {
    sisear() {
        return this.sonido;
    }
}

class Aguila extends Animal {
    chillar() {
        return this.sonido;
    }
}

export { Leon, Lobo, Oso, Serpiente, Aguila };
