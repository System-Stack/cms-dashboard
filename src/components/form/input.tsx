import { type QRL, component$, Slot } from '@builder.io/qwik'

type InputProps = {
    type?: 'text' | 'email',
    name: string,
    value: string,
    required?: boolean,
    autoComplete?: string,
    placeholder?: string,
    error: string | null,
    onInput: QRL<(e: Event) => void>
}
export default component$<InputProps>(({
    type = 'text',
    name,
    value,
    required = false,
    autoComplete,
    placeholder,
    error,
    onInput }) => {
    return (
        <div class="mt-6">
            <label for={ name } class="block w-full"><Slot /></label>
            <input
                type={ type }
                id={ name }
                name={ name }
                value={value}
                required={ required }
                placeholder={ placeholder }
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
            {error &&
                <p class="mt-2 text-red-700 dark:text-red-400 text-sm" id={ `${ name }-error` } aria-live="polite">{error}</p>
            }
        </div>
    )
})