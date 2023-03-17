describe('Transações', () => {
  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/#')

  });
  it('Cadastrar uma transação de entrada', () => {
    criarTransação(2500, "2023-02-20", "Salário")
    cy.contains('.description', 'Salário').should('exist')
    cy.get('#expenseDisplay').should('have.text', 'R$ 2.500,00')

  })

  it('Cadastrar uma transação de saída', () => {
    criarTransação(-50, "2023-02-16", "Lanche iFood")
    cy.contains('.description', 'Lanche iFood').should('exist')
    cy.get('#expenseDisplay').should('have.text', '- R$ 50,00')

  });

  it('Excluir transação', () => {
    criarTransação(2500, "2023-02-15", "Salário")
    cy.get('.description').should('have.text', 'Salário')
    criarTransação(150, "2023-02-15", "Freela")
    cy.contains('.description', 'Freela').should('exist')
    excluirTransação('Freela')
    cy.contains('.description', 'Freela').should('not.exist')
  });

  // it('Fluxo maior', () => {
  // criarTransação(2500, "2023-02-15", "Salário")
  // cy.get('.description').should('have.text', 'Salário')
  // criarTransação(-99, "2023-02-20", "Fatura da internet")
  // cy.contains('.description', 'Fatura da internet').should('exist')

  // criarTransação(-50, "2023-02-16", "Lanche iFood")
  // cy.contains('.description', 'Lanche iFood').should('exist')
  // });

})

function criarTransação(valor, data, descricao) {
  cy.contains("Nova Transação").click()
  cy.get('#description').type(descricao)
  cy.get('#amount').type(valor)
  cy.get('#date').type(data)

  cy.contains('button', 'Salvar').click()
}

function validarTransação(valor, data, descricao) {
  cy.contains('.description', descricao).should('exist')

}

function excluirTransação(descricao) {
  cy.contains('.description', descricao)
    .parent()
    .find('img')
    .click()
}