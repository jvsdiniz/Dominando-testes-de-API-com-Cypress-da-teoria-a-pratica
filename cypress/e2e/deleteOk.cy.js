it('create user with fixture another option', () => {
    let randomText = ""
    let testEmail = ""

    var pattern = "ABCDEFGHYIZOBHJFJKDHFJDHfjkhdsjkfhjdshfjksdhf"
    for (var i = 0; i< 10; i++)
      randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
    testEmail = randomText + '@gmail.com'

    cy.fixture('createuser').then((payload) => {
    //  Cypress fornece um diretório nomeado como fixtures, que armazena vários arquivos "JSON", 
    // e esses arquivos JSON podem armazenar os dados de teste que podem ser lidos por vários testes.
    // Armazenamos dados de teste na forma de valores-chave, que podemos acessar nos scripts de teste.

    cy.api({
      method: 'POST',
      url: 'https://gorest.co.in/public/v1/users',
      headers: {
        'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
      },
      body: {
        "name": 'Alan',
        "gender": 'Male',
    //    "email": 'alanvoigt1@yahoo.com.br',  
        "email": testEmail,
        "status": 'inactive'
      }

    }).then((res)=>{
      cy.log(JSON.stringify(res))
      expect(res.status).to.eq(201)
  //    expect(res.body.data).has.property('email', 'alanvoigt1@yahoo.com.br')
        expect(res.body.data).has.property('email', testEmail)
        const userId = res.body.data.id
       cy.api({
          method: 'PUT',
          url: 'https://gorest.co.in/public/v1/users/' + userId,
          headers: {
            'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
          },
          body: {
            "name": 'João Diniz',
            "gender": 'Male',
            "email": payload.email,
            "status": 'active'
          }
        
        }).then((res)=>{
          expect(res.status).to.eq(200)
        //  expect(res.body.data).has.property('email', 'alanvoigt3@yahoo.com.br')
          expect(res.body.data).has.property('email', payload.email)
          expect(res.body.data).has.property('name', 'João Diniz')

          const userId = res.body.data.id

          cy.api({
            method: 'DELETE',
            url: `https://gorest.co.in/public/v1/users/${userId}`,
            headers: {
                'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
              }
          }).then((res) => {
            expect(res.status).to.eq(204)
          })
      })
    })
  })
})