describe('Transações', () => {
  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/#')

  });
  it('Cadastrar uma transação de entrada', () => {
    criarTransação(2500, "2023-02-20", "Salário")
    cy.contains('.description', 'Salário').should('exist')
    validarValores('#incomeDisplay', 'R$ 2.500,00')

  })

  it('Cadastrar uma transação de saída', () => {
    criarTransação(-50, "2023-02-16", "Lanche iFood")
    cy.contains('.description', 'Lanche iFood').should('exist')
    validarValores('#expenseDisplay', '-R$ 50,00')

  });

  it('Excluir transação', () => {
    criarTransação(2500, "2023-02-15", "Salário")
    cy.get('.description').should('have.text', 'Salário')
    criarTransação(150, "2023-02-15", "Freela")
    cy.contains('.description', 'Freela').should('exist')
    excluirTransação('Freela')
    cy.contains('.description', 'Freela').should('not.exist')
  });

  it('Validar saldo total com entradas e saídas', () => {
    criarTransação(2500, "2023-02-15", "Salário")
    cy.get('.description').should('have.text', 'Salário')
    criarTransação(-99, "2023-02-20", "Fatura da internet")
    cy.contains('.description', 'Fatura da internet').should('exist')
    criarTransação(-50, "2023-02-16", "Lanche iFood")
    cy.contains('.description', 'Lanche iFood').should('exist')
    criarTransação(-550, "2023-02-16", "Transação incorreta")
    cy.contains('.description', 'Transação incorreta').should('exist')
    excluirTransação('Transação incorreta')
    cy.contains('.description', 'Transação incorreta').should('not.exist')
    criarTransação(150, "2023-02-15", "Freela")
    cy.contains('.description', 'Freela').should('exist')
    validarValores('#expenseDisplay', '-R$ 149,00')
    validarValores('#incomeDisplay', 'R$ 2.650,00')
    validarValores('#totalDisplay', 'R$ 2.501,00')


  });

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


function validarValores(campo, valor) {
  cy.get(campo).invoke('text')
    .invoke('replace', /\u00a0/g, ' ')
    .should('eq', valor)

}
