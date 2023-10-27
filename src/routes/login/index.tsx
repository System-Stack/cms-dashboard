import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
    return (
        <>
            <h1>Login</h1>
            <form action="">Login form</form>
        </>
    )
})

export const head: DocumentHead = {
    title: 'Login',
    meta: [
        {
            name: 'description',
            content: 'Log in to your dashboard.',
        },
    ],
}