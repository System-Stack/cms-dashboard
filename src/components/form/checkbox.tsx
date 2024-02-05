import { type QRL, Slot, component$ } from '@builder.io/qwik'

type CheckboxProps ={
    name: string,
    value: boolean,
    required?: boolean,
    error: string | null,
    onInput: QRL<() => void>
}
export default component$<CheckboxProps>(({ name, value, required = false, error, onInput }) => {
    return (
        <div class="mt-6">
            <label class="inline-flex items-center">
                <input
                    type="checkbox"
                    id={ name }
                    name={ name }
                    required={ required }
                    aria-required={ required ? 'true' : 'false' }
                    aria-invalid={ error ? true : false }
                    aria-describedby={ `${ name }-error` }
                    checked={ value }
                    class="rounded border-gray-300 text-middle accent-middle shadow-sm
                        hover-ring focus-ring focus:ring-offset-0"
                    onInput$={ onInput }
                />
                <span class="ml-2"><Slot /></span>
            </label>
            { error &&
                <p class="mt-2 text-red-400 text-sm" id={ `${ name }-error` } aria-live="polite">{ error }</p>
            }
        </div>
    )
})