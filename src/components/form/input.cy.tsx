import { $ } from '@builder.io/qwik'
import Input from './input'

const defaultProps = {
    name: 'name',
    value: 'value',
    error: null,
    onInput: $(() => {})
}
it('should render', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)
    
    cy.get('input').should('exist')
    cy.get('label').should('exist')
})

it('should have a label', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)

    cy.get('label').should('contain.text', 'Input Label')
})

it('should have a name and id', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)
    
    cy.get('input').should('have.attr', 'name', defaultProps.name)
    cy.get('input').should('have.attr', 'id', defaultProps.name)
})

it('should be a text input as default', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)
    
    cy.get('input').should('have.attr', 'type', 'text')
})

it('should accept a type prop', () => {
    const props = {
        ...defaultProps,
        type: 'email' as 'text' | 'email',
    }
    cy.mount(<Input {...props}>Input Label</Input>)
    
    cy.get('input').should('have.attr', 'type', props.type)
})

it('should accept a value prop', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)
    
    cy.get('input').should('have.value', defaultProps.value)
})

it('should not be required as default', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)
    
    cy.get('input').should('not.have.attr', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'false')
})

it('should accept a truthy required prop', () => {
    const props = {
        ...defaultProps,
        required: true,
    }
    cy.mount(<Input {...props}>Input Label</Input>)
    
    cy.get('input').should('have.attr', 'required', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'true')
})

it('should accept a falsy required prop', () => {
    const props = {
        ...defaultProps,
        required: false,
    }
    cy.mount(<Input {...props}>Input Label</Input>)
    
    cy.get('input').should('not.have.attr', 'required')
    cy.get('input').should('have.attr', 'aria-required', 'false')
})

it('should have no placeholder as default', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)
    
    cy.get('input').should('not.have.attr', 'placeholder')
})

it('should accept a placeholder prop', () => {
    const props = {
        ...defaultProps,
        placeholder: 'Placeholder text',
    }
    cy.mount(<Input {...props}>Input Label</Input>)
    
    cy.get('input').should('have.attr', 'placeholder', props.placeholder)
})

it('should have no autocomplete as default', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)
    
    cy.get('input').should('not.have.attr', 'autocomplete')
})

it('should accept an autoComplete prop', () => {
    const props = {
        ...defaultProps,
        autoComplete: 'email',
    }
    cy.mount(<Input {...props}>Input Label</Input>)
    
    cy.get('input').should('have.attr', 'autocomplete', props.autoComplete)
})

it('should not show an error message if error is null', () => {
    cy.mount(<Input {...defaultProps}>Input Label</Input>)
    
    cy.get('input').should('have.attr', 'aria-invalid', 'false')
    cy.get('input').should('have.attr', 'aria-describedby', `${ defaultProps.name }-error`)
    cy.get(`#${ defaultProps.name }-error`).should('not.exist')
})

it('should accept an error prop', () => {
    const props = {
        ...defaultProps,
        error: 'Error message',
    }
    cy.mount(<Input {...props}>Input Label</Input>)
    
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
    
    cy.mount(<Input {...props}>Input Label</Input>)
    
    cy.get('input').type('1234')

    cy.get('@consoleLog').should('have.been.called')
    cy.get('@consoleLog').should('have.callCount', 4)
})