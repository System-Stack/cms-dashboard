import { $ } from '@builder.io/qwik'
import Checkbox from './checkbox'

const defaultProps = {
    name: 'name',
    value: false,
    error: null,
    onInput: $(() => {})
}

it('should render', () => {
    cy.mount(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('exist')
    cy.get('label').should('exist')
})

it('should have a label', () => {
    cy.mount(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)

    cy.get('label').should('contain.text', 'Checkbox Label')
})

it('should have a name and id', () => {
    cy.mount(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('have.attr', 'name', defaultProps.name)
    cy.get('input').should('have.attr', 'id', defaultProps.name)
})

it('should have a type of checkbox as default', () => {
    cy.mount(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('have.attr', 'type', 'checkbox')
})

it('should accept a falsy value prop', () => {
    cy.mount(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('not.be.checked')
})

it('should accept a truthy value prop', () => {
    const props = {
        ...defaultProps,
        value: true,
    }
    cy.mount(<Checkbox {...props}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('be.checked')
})

it('should not be required as default', () => {
    cy.mount(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('not.have.attr', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'false')
})

it('should accept a truthy required prop', () => {
    const props = {
        ...defaultProps,
        required: true,
    }
    cy.mount(<Checkbox {...props}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('have.attr', 'required', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'true')
})

it('should accept a falsy required prop', () => {
    const props = {
        ...defaultProps,
        required: false,
    }
    cy.mount(<Checkbox {...props}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('not.have.attr', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'false')
})

it('should not show an error message if error is null', () => {
    cy.mount(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('have.attr', 'aria-invalid', 'false')
    cy.get('input').should('have.attr', 'aria-describedby', `${ defaultProps.name }-error`)
    cy.get(`#${ defaultProps.name }-error`).should('not.exist')
})

it('should accept an error prop', () => {
    const props = {
        ...defaultProps,
        error: 'Error message',
    }
    cy.mount(<Checkbox {...props}>Checkbox Label</Checkbox>)
    
    cy.get('input').should('have.attr', 'aria-invalid', 'true')
    cy.get('input').should('have.attr', 'aria-describedby', `${ defaultProps.name }-error`)
    cy.get(`#${ defaultProps.name }-error`).should('contain.text', props.error)
})

it('should call the onInput function on input', () => {
    cy.stub(window.console, 'log').as('consoleLog')
    const props = {
        ...defaultProps,
        onInput: $(() => {console.log('inputting')}),
    }
    
    cy.mount(<Checkbox {...props}>Checkbox Label</Checkbox>)
    
    cy.get('input').check()

    cy.get('@consoleLog').should('have.been.called')
    cy.get('@consoleLog').should('have.callCount', 1)
    cy.get('input').should('be.checked')
})