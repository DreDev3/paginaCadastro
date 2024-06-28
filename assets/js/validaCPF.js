class VericadorDeCpf {
    constructor(validaCpf) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: true,
            get: function () {
                return validaCpf.replace(/\D+/g, '')
            }
        })
    }

    isSequencia() {
        return this.cpfLimpo[0].repeat(11) === this.cpfLimpo
    }

    valida() {
        if (typeof this.cpfLimpo === 'undefined') return false
        if (this.cpfLimpo.length !== 11) return false
        if (!this.cpfLimpo) return false
        if (this.isSequencia()) return false

        const cpfParcial = this.cpfLimpo.slice(0, -2)
        const primeiroDigito = VericadorDeCpf.criaDigito(cpfParcial)
        const segundoDigito = VericadorDeCpf.criaDigito(cpfParcial + primeiroDigito)


        const novoCpf = cpfParcial + primeiroDigito + segundoDigito
        return novoCpf === this.cpfLimpo
    }

    static criaDigito(cpfParcial) {// Como nesse método não fui utilizado o 'this' ou seja, não foi necessário nada da instancia, pode-se utlizar o static(apenas aplicado para exemplificar a utilização)
        const cpfArray = Array.from(cpfParcial)
        let mult = cpfArray.length + 1
        let total = 0
        for(let i of cpfArray){
            total += mult * i
            mult--
        }
        
        const digito = 11 - (total % 11)
        return digito > 9 ? '0' : String(digito)
    }
}

/* const cpf = new VericadorDeCpf('705.484.450-52')
if(cpf.valida()) {
    console.log('CPF válido');
} else {
    console.log('CPF inválido');
} */