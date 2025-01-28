import Kikuri from './kikuri'
import Queue from '../lib/structures/Queue'
import APIManager from '../lib/structures/APIManager'
import SettingsProvider from '../lib/structures/SettingsProvider'
import Settings from '../database/Settings'

export default class Components {
    client: Kikuri

    public constructor(cli: Kikuri) {
        this.client = cli
    }

    async _loadAll() {
        await this._createStructs()
    }

    private async _createStructs() {
        const apiConfig = { method: 'GET', url: '' }

        this.client.queue = new Queue(this.client)
        this.client.apiManager = new APIManager<any>(this.client, apiConfig)

        this.client.settings = new SettingsProvider(Settings)
        await this.client.settings._init()
    }
}