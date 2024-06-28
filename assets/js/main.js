class ValidaForm {
    constructor() {
        this.form = document.querySelector('.form')
        this.eventos();
    }

    eventos() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const validField = this.isValid()
        const validPass = this.validPass()

        if (validField && validPass) {
            alert('Formulário enviado')
            this.form.submit()
        }
    }

    isValid() {
        let valid = true

        for (let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (let field of this.form.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText.replace(':', '')
            if (!field.value) {
                this.createError(field, `*Campo ${label} não pode estar em branco`)
                valid = false
            }

            if (field.classList.contains('cpf')) {
                if (!this.validaCPF(field)) valid = false
            }

            if (field.classList.contains('usuario')) {
                if (!this.validUser(field)) valid = false
            }
        }
        return valid
    }

    createError(field, text) {
        const div = document.createElement('div')
        div.classList.add('error-text')
        div.innerHTML = text
        field.insertAdjacentElement('afterend', div)
    }

    validaCPF(field) {
        let valid = true
        const cpf = new VericadorDeCpf(field.value)
        if (!field.value) return
        if (!cpf.valida()) {
            this.createError(field, 'CPF Inválido')
            valid = false
        }
        return valid
    }

    validUser(field) {
        const usuario = field.value
        let valid = true

        if (!field.value) return
        if (usuario.length < 3 || usuario.length > 12) {
            this.createError(field, 'Usuário precisa coonter entre 3 e 12 caracteres')
            valid = false
        }

        else if (!usuario.match(/^[a-zA-z0-9]+$/g)) {
            this.createError(field, 'Usuário precisa conter apenas letras e/ou números')
            valid = false
        }
        return valid
    }

    validPass() {
        let valid = true
        const firstPass = this.form.querySelector('.senha')
        const secondPass = this.form.querySelector('.senha-check')

        if (firstPass.value !== secondPass.value) {
            this.createError(firstPass, 'Campos não correspodem. Digite novamente!')
            this.createError(secondPass, 'Campos não correspodem. Digite novamente!')
            valid = false
        }

        else if (firstPass.value.length < 6 || firstPass.value.length > 12) {
            this.createError(firstPass, 'Senha precisa conter entre 6 e 12 caracteres')
            valid = false
        }
        return valid
    }
}
const valida = new ValidaForm()