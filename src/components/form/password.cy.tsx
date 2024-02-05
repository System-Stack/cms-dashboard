import { $ } from '@builder.io/qwik'
import Password from './password'

const defaultProps = {
    name: 'name',
    value: 'value',
    error: null,
    onInput: $(() => {})
}

it('should render', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)
    
    cy.get('input').should('exist')
    cy.get('label').should('exist')
})

it('should have a label', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)

    cy.get('label').should('contain.text', 'Password Label')
})

it('should have a name and id', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)
    
    cy.get('input').should('have.attr', 'name', defaultProps.name)
    cy.get('input').should('have.attr', 'id', defaultProps.name)
})

it('should have a type of password as default', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)
    
    cy.get('input').should('have.attr', 'type', 'password')
})

it('should have a button that switches password visibility', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)
    
    cy.get('button').should('exist')
})

it('should switch to type of text when button is clicked', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)

    cy.get('input').should('have.attr', 'type', 'password')
    cy.get('button').should('have.attr', 'title', 'Show password')
    
    cy.get('button').click()
    
    cy.get('input').should('have.attr', 'type', 'text')
    cy.get('button').should('have.attr', 'title', 'Hide password')
    
    cy.get('button').click()
    
    cy.get('input').should('have.attr', 'type', 'password')
    cy.get('button').should('have.attr', 'title', 'Show password')
})

it('should accept a value prop', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)
    
    cy.get('input').should('have.value', defaultProps.value)
})

it('should not be required as default', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)
    
    cy.get('input').should('not.have.attr', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'false')
})

it('should accept a truthy required prop', () => {
    const props = {
        ...defaultProps,
        required: true,
    }
    cy.mount(<Password {...props}>Password Label</Password>)
    
    cy.get('input').should('have.attr', 'required', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'true')
})

it('should accept a falsy required prop', () => {
    const props = {
        ...defaultProps,
        required: false,
    }
    cy.mount(<Password {...props}>Password Label</Password>)
    
    cy.get('input').should('not.have.attr', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'false')
})

it('should have no autocomplete as default', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)
    
    cy.get('input').should('not.have.attr', 'autocomplete')
})

it('should accept an autoComplete prop', () => {
    const props = {
        ...defaultProps,
        autoComplete: 'current-password',
    }
    cy.mount(<Password {...props}>Password Label</Password>)
    
    cy.get('input').should('have.attr', 'autocomplete', 'current-password')
})

it('should not show an error message if error is null', () => {
    cy.mount(<Password {...defaultProps}>Password Label</Password>)
    
    cy.get('input').should('have.attr', 'aria-invalid', 'false')
    cy.get('input').should('have.attr', 'aria-describedby', `${ defaultProps.name }-error`)
    cy.get(`#${ defaultProps.name }-error`).should('not.exist')
})

it('should accept an error prop', () => {
    const props = {
        ...defaultProps,
        error: 'Error message',
    }
    cy.mount(<Password {...props}>Password Label</Password>)
    
    cy.get('input').should('have.attr', 'aria-invalid', 'true')
    cy.get('input').should('have.attr', 'aria-describedby', `${ defaultProps.name }-error`)
    cy.get(`#${ defaultProps.name }-error`).should('contain.text', 'Error message')
})

it('should call the onInput function on input', () => {
    cy.stub(window.console, 'log').as('consoleLog')
    const props = {
        ...defaultProps,
        onInput: $(() => {console.log('inputting')}),
    }
    cy.mount(<Password {...props}>Password Label</Password>)
    
    cy.get('input').type('1234')

    cy.get('@consoleLog').should('have.been.called')
    cy.get('@consoleLog').should('have.callCount', 4)
})