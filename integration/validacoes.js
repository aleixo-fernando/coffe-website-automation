const validacoes = (()=>{

    function verificaURL(urlwebsite){
        cy.visit(urlwebsite)
        if(
        cy.url().should('eq',urlwebsite)  
)
cy.log('URL CORRETA')
    }

    function verificaCoffes(numberofCoffes){
        if(
        cy.get('.cup-body').should('have.length',numberofCoffes)
    )
    cy.log('HÁ 9 CAFÉS COMO DE ESPERADO')
}  

    function verificaCarrinhoVazio(urlCarrinho){
        cy.visit(urlCarrinho)
            cy.get('p').should('exist')
            cy.contains('No coffee, go add some.')
            cy.log('Carrinho vazio.')
    }


    function compraCoffeEspecifico(nomecoffe){
        cy.log('Comprando o café '+nomecoffe)
        cy.get(`[data-test="${nomecoffe}"]`).click()
            cy.contains('h4[data-v-a9662a08]',nomecoffe).then(($h4Element) =>{
            const preco = $h4Element.find('small').text();
            cy.log('BEBIDA:' + nomecoffe)
            cy.log('PREÇO: ' + preco)
            cy.wrap(preco).as('preco')
            cy.contains('Total:').should('have.text','Total: '+preco)
            cy.log(`O preço do café `+nomecoffe+` está corretamente precificado`)
        })       
        
    }

    function checkoutrapido(nomeCliente,nomeEmail){
        cy.get('[data-test="checkout"]').click({force:true})
        cy.wait(10000)       
        cy.get('#name').type(nomeCliente)
        cy.get('#email').type(nomeEmail) 
        cy.get('#promotion').check()
        cy.get('.close').click()
        cy.wait(10000)
        cy.log('PRESSIONAR O BOTÃO DE ENVIAR E-MAIL RESULTA EM BUG, PULANDO PARA O PRÓXIMO PASSO.')
        cy.contains('cart').click()

    }

    
















    return {verificaURL,verificaCoffes,verificaCarrinhoVazio,compraCoffeEspecifico,checkoutrapido}
})();
export default validacoes;



