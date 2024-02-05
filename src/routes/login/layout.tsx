import { Slot, component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
    return (
        <main class="flex flex-wrap h-screen">
            <div class="w-full md:w-1/2 p-4 md:py-16 md:px-6 lg:px-8 xl:px-16 2xl:px-32
                flex items-center justify-center md:items-end md:justify-end text-white
                login-bg">
                <div class="max-w-prose md:mb-24 text-shadow">
                    <h2 class="pb-4 text-2xl lg:text-4xl 2xl:text-5xl">Some description of the company</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut scelerisque neque. Integer tempus vestibulum dui, eu imperdiet diam. Vestibulum lobortis et neque ac ultricies. Nam faucibus, mi ut viverra aliquet, justo erat consectetur lorem, eget cursus lorem justo ut risus.</p>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-4 md:p-6 lg:p-8 xl:p-16 2xl:p-32
                flex items-center justify-center md:justify-start
                bg-white text-gray-700 dark:bg-darker dark:text-gray-100">
                <Slot />
            </div>
        </main>
    )
})

export const head: DocumentHead = ({ head }) => {
    return {
        title: `${ head.title } | X`,
    }
}