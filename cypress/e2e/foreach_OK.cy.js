describe("API testing with Alias", () => {

    beforeEach(() => {
        cy.api('GET', "https://reqres.in/api/users?page=2").as('users')
    })

    it('Validate user info in data json array', () => {
        cy.get('@users')
            .its('body').then((res) => {
                expect(res.data[0]).has.property('first_name', "Michael")
                res.data.forEach(element => {
                    expect(element).has.property('first_name')
                })
            })
    });
})