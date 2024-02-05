import { $, component$, useContext, useSignal, useStore } from '@builder.io/qwik'
import { Link, type DocumentHead, z } from '@builder.io/qwik-city'
import {
    Checkbox,
    Input,
    Password,
    Submit
} from '~/components/form'
import { AuthContext } from '~/root'

type LoginForm = {
    email: string,
    password: string,
    remember: boolean,
}
type LoginErrors = {
    email: string | null,
    password: string | null,
    remember: string | null,
    response: string | null,
}
export default component$(() => {

    const userState = useContext(AuthContext)

    const formState = useStore<LoginForm>({
        email: '',
        password: '',
        remember: false,
    })

    const error = useStore<LoginErrors>({
        email: null,
        password: null,
        remember: null,
        response: null,
    })

    const isLoading = useSignal(false)

    const onEmailInput = $((e: Event) => {
        formState.email = (e.target as HTMLInputElement).value
        console.log('called')
    })
    const onPasswordInput = $((e: Event) => {
        formState.password = (e.target as HTMLInputElement).value
    })
    const onRememberInput = $(() => {
        formState.remember = !formState.remember
    })

    return (
        <div class="w-full max-w-prose">
            <h1 class="pb-4 text-2xl lg:text-4xl 2xl:text-5xl font-medium">
                Welcome to <span class="text-middle dark:text-light">X</span>
            </h1>
            <p>Please enter your credentials to log in</p>
            {error.response && <p class="mt-4 text-red-400" aria-live="polite">{error.response}</p>}
            <form class="my-2 md:mr-4 text-darkergray dark:text-lightgray"
                noValidate
                preventdefault:submit
                onSubmit$={async () => {
                    console.log('submitting')
                    isLoading.value = true
                    // clear errors
                    error.email = null
                    error.password = null
                    error.remember = null
                    error.response = null

                    const schema = z.object({
                        email: z.string()
                            .min(1, { message: 'The email field is required.' })
                            .email({ message: 'Please provide a valid email address.'})
                            .max(255),
                        password: z.string().min(1, { message: 'The password field is required.'}).max(255),
                        remember: z.boolean().optional(),
                    })
                    const result = schema.safeParse(formState)

                    if (!result.success) {
                        const errors = result.error.flatten();
                        Object.entries(errors.fieldErrors).forEach(([key, value]) => {
                            if (key in error) {
                                error[key as keyof LoginErrors] = value.join(' ')
                            }
                        })
                    } else {
                        // fake processing
                        const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
                        await delay(2000)

                        userState.username = 'John Doe'
                        userState.token = '123456'
                    }

                    isLoading.value = false
                }}
            >
                <Input
                    type="email"
                    name="email"
                    value={ formState.email }
                    required={ true }
                    autoComplete="email"
                    error={ error.email }
                    onInput={ onEmailInput }>
                    E-mail
                </Input>
                <Password
                    name="password"
                    value={ formState.password }
                    required={ true }
                    autoComplete="current-password"
                    error={ error.password }
                    onInput={ onPasswordInput }>
                    Password
                </Password>
                <Checkbox
                    name="remember"
                    value={ formState.remember }
                    error={ error.remember }
                    onInput={ onRememberInput }>
                    Remember me
                </Checkbox>
                <Submit isLoading={ isLoading }>
                    Sign in
                </Submit>
                <div class="my-4 flex flex-wrap justify-between gap-4">
                    <p><Link href="/forgotten-password"
                        class="link">Forgot password?</Link></p>
                    <p>Don't have an account? <Link href="/request-access"
                        class="link">Send request</Link></p>
                </div>
            </form>
        </div>
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