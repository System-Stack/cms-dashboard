import { http, delay, HttpResponse } from 'msw'

export default [
    http.get('/api/login', async () => {
        await delay(500)
        return HttpResponse.json(
            [], { status: 200 }
        )
    })
]