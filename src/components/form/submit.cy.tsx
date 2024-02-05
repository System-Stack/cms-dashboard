import { component$, useSignal } from '@builder.io/qwik'
import Submit from './submit'

const Wrapper = component$(() => {
    const defaultProps = {
        isLoading: useSignal(false)
    }
    return (
        <Submit {...defaultProps}>Submit</Submit>
    )
})

it('should render', () => {
    cy.mount(<Wrapper />)
    
    cy.get('button').should('exist')
})

it('should have a type submit', () => {
    cy.mount(<Wrapper />)

    cy.get('button').should('have.attr', 'type', 'submit')
})

it('should accept a falsy isLoading prop', () => {
    cy.mount(<Wrapper />)
    
    cy.get('button').should('contain.text', 'Submit')
    cy.get('button').should('not.contain.text', 'Please wait')
})

it('should accept a truthy isLoading prop', () => {
    const Wrapper = component$(() => {
        const defaultProps = {
            isLoading: useSignal(true)
        }
        return (
            <Submit {...defaultProps}>Submit</Submit>
        )
    })
    cy.mount(<Wrapper />)
    
    cy.get('button').should('contain.text', 'Please wait')
    cy.get('button').should('not.contain.text', 'Submit')
})