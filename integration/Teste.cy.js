import validacoes from "./validacoes"

describe('Validating coffe website', () => {
  it('Visiting url', () => {
        cy.log('Website url should be exactly what were trying to get in')
        validacoes.verificaURL('https://coffee-cart.app/')
        cy.log('There should be 9 coffess available')
        validacoes.verificaCoffes(9)
        cy.log('Cart should be empty')
        validacoes.verificaCarrinhoVazio('https://coffee-cart.app/cart')
  })

  it('Buying Specific Coffe',() =>{
    cy.log('Entrando no website')
    cy.visit('https://coffee-cart.app/')
    cy.log('Asserting there are 9 coffes available on the menu')
    validacoes.verificaCoffes(9)
    cy.log('Buying a random coffe')
    validacoes.compraCoffeEspecifico('Americano')
    cy.log('Checkout')
    validacoes.checkoutrapido('nome','email@email.com')
  })



})