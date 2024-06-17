const API_CEP = Cypress.env('API_CEP')

describe('Testes automaticos da API consulta CEP', () => {
    it('Consulta de um CEP válido', () => {
        cy.api({
            method: 'GET',
            url: API_CEP,
            failOnStatusCode: false
        }).as('response')
        //Salva como resposta e agora trabalhamos a partir dela
        cy.get('@response').should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.cep).to.equal('01001-000')
            expect(response.body.logradouro).to.equal('Praça da Sé')
            expect(response.body.complemento).to.equal('lado ímpar')
            expect(response.body.bairro).to.equal('Sé')
            expect(response.body.localidade).to.equal('São Paulo')
            expect(response.body.uf).to.equal('SP')
            expect(response.body.ibge).to.equal('3550308')
            expect(response.body.gia).to.equal('1004')
            expect(response.body.ddd).to.equal('11')
            expect(response.body.siafi).to.equal('7107')
        })
    });

    it('Verificar headers', () => {
        cy.api({
            method: 'GET',
            url: API_CEP,
            failOnStatusCode: false
        }).as('response')
        //Salva como resposta e agora trabalhamos a partir dela
        cy.get('@response').should(response => {
            expect(response.headers).to.have.property ('content-type', 'application/json; charset=utf-8')
        })

    })

    it('Verificar headers, segunda forma', () => {
        cy.api('GET','http://viacep.com.br/ws/01001000/json').then(response => {
            expect(response.headers).to.have.property ('content-type', 'application/json; charset=utf-8')
        })
    })
})