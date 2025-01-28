import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import Kikuri from '../../client/kikuri'

export class APIManager {
    client: Kikuri
    config: AxiosRequestConfig

    constructor(client: Kikuri, config: AxiosRequestConfig) {
        this.client = client
        this.config = config
    }

    async call(): Promise<any> {
        return new Promise((res) => {
            this.client.queue.add(
                axios(this.config)
                    .then(r => res(r.data))
                    .catch(err => this.client.logger.error('ERROR', err)) //rej(err)
            )
        })
    }

    getUrl(): string {
        return axios.getUri(this.config)
    }

    resetConfig(config: AxiosRequestConfig = { method: 'GET', url: '', params: {}, headers: {} }): AxiosRequestConfig {
        return this.config = config
    }
}

export default APIManager