import { component$, type QRL, Slot, useSignal } from '@builder.io/qwik'

type PasswordProps = {
    name: string,
    value: string,
    required?: boolean,
    autoComplete?: string,
    error: string | null,
    onInput: QRL<(e: Event) => void>
}
export default component$<PasswordProps>(({ name, value, required = false, autoComplete, error, onInput }) => {

    const showPassword = useSignal(false)

    return (
        <div class="mt-6 relative">
            <label for="password" class="block w-full"><Slot /></label>
            <input
                type={showPassword.value ? 'text' : 'password'}
                id={ name }
                name={ name }
                value={ value }
                required={ required }
                autoComplete={ autoComplete }
                aria-required={ required ? 'true' : 'false' }
                aria-invalid={ error ? true : false }
                aria-describedby={ `${ name }-error` }
                class="block w-full mt-1 rounded-md shadow-sm
                    text-darkgray bg-lightgray border-lightgray placeholder:text-gray-700
                    dark:text-white dark:bg-darkgray dark:border-darkgray dark:placeholder:text-gray-400
                    focus:bg-white focus:dark:bg-darker
                    hover-ring focus-ring"
                onInput$={ onInput }
                />
            <div class="absolute top-9 right-3">
                <button type="button" title={ showPassword.value ? 'Hide password' : 'Show password'  }
                    preventdefault:click
                    class="dark:text-lightgray rounded-lg hover-ring focus-ring hover:bg-light/50 focus:bg-light/50"
                    onClick$={ () => { showPassword.value = !showPassword.value } }
                >
                    <svg
                        class={ `h-6 w-6 fill-none stroke-current ${ showPassword.value ? 'hidden' : 'block' }` }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    <svg
                        class={ `h-6 w-6 fill-none stroke-current ${ showPassword.value ? 'block' : 'hidden' }` }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                    </svg>
                </button>
            </div>
            { error &&
                <p class="mt-2 text-red-400 text-sm" id={ `${ name }-error` } aria-live="polite">{ error }</p>
            }
        </div>
    )
})