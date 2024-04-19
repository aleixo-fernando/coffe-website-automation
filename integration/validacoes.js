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


     function compraCoffeEspecifico(nomecoffe,vezes){
        var preco_total=0;
        cy.log('Comprando o café '+nomecoffe+ ' '+vezes+' vezes.')
        for(let i=0;i<vezes;i++){

            var precoemfloat
            var contador = 1;
            var preco = cy.contains('h4',nomecoffe)
            .find('small')
            .invoke('text')
            .then((preco) =>{
                precoemfloat = parseFloat(preco.replace("$",""))
                cy.log(preco)
            cy.get(`[data-test="${nomecoffe}"]`).click()
            var subpreco = precoemfloat * contador
            contador++
            preco_total = preco_total + subpreco
            cy.get('[data-test="checkout"]').should('have.text','Total: $'+subpreco+'.00')
            cy.wait(1000)
            })
            } 

    
    
    console.log(preco_total)
    return preco_total

    }

    function checkoutrapido(nomeCliente,nomeEmail){
        let compracoffe = this.compraCoffeEspecifico('Americano','2')
        console.log(compracoffe)
        cy.get('[data-test="checkout"]').click({force:true})
        cy.wait(1000)       
        cy.get('#name').type(nomeCliente)
        cy.get('#email').type(nomeEmail) 
        cy.get('#promotion').check()
        cy.get('.close').click()
        cy.wait(1000)
        cy.log('PRESSIONAR O BOTÃO DE ENVIAR E-MAIL RESULTA EM BUG, PULANDO PARA O PRÓXIMO PASSO.')
        cy.contains('cart').click()
        cy.wait(1000)
        cy.get('[data-test="checkout"]').should('have.text','Total: $'+compracoffe+'.00')

    }

    
















    return {verificaURL,verificaCoffes,verificaCarrinhoVazio,compraCoffeEspecifico,checkoutrapido}
})();
export default validacoes;



