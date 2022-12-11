import { UserDataController } from "./redisController";
import gameConfig from '@data/game_config.json'

class EnergyController extends UserDataController {
    constructor(user_id: number) {
        super(user_id)
    }

    async addEnergy() {
        try {
            const data = await this.get()
            const { current, max } = data.energy

            if (current + 1 === max) {
                data.energy.current += 1
                data.energy.refresh = null
                this.update(data)
                return;
            }

            if (current === max) {
                data.energy.refresh = null
                this.update(data)
                return
            }

            data.energy.current += 1
            data.energy.refresh = Date.now() + gameConfig.energy_reload_time
            await this.update(data)
            await this.refreshEnergy()
        }
        catch (error) {
            console.error(error)
        }
    }

    async decreaseEnergy() {
        try {
            const data = await this.get()
            if (data.energy.current <= 0) return;
            data.energy.current -= 1
            if (data.energy.refresh === null) {
                data.energy.refresh = Date.now() + gameConfig.energy_reload_time
            }
            await this.update(data)
            await this.refreshEnergy()
        }
        catch (error) {
            console.error(error)
        }
    }

    public async refreshEnergy() {
        const data = await this.get()
        if (data.energy.refresh === null || data.energy.current >= data.energy.max) return;
        setTimeout(() => {
            this.addEnergy()
        }, data.energy.refresh - Date.now())
    }
}

export { EnergyController }