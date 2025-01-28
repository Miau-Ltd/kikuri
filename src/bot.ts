import kikuri from './client/kikuri'
import { envs } from './lib/util/environmentVariables'

const config = {
    owner: envs.owner,
    token: atob(envs.token),
    intents: Number(envs.intents)
}

new kikuri(config).start()