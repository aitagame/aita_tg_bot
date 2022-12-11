import { UserDataController } from "./redisController";
import gameConfig from '@data/game_config.json'

class EnergyController extends UserDataController {
    constructor(user_id: number) {
        super(user_id)
    }

    async addEnergy() {
        try {
            const data = await this.get()
            data.energy.current++
            console.log(data)
            if (data.energy.current >= data.energy.max) {
                data.energy.refresh = null
                this.update(data)
                console.log('no energy more')
                return;
            }
            
            data.energy.refresh = Date.now() + gameConfig.energy_reload_time
            this.update(data)
            this.refreshEnergy()
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
            this.update(data)
            this.refreshEnergy()
        }
        catch (error) {
            console.error(error)
        }
    }

    public async refreshEnergy() {
        const data = await this.get()
        if ( data.energy.refresh === null || data.energy.current >= data.energy.max) return;
        setTimeout(() => {
            this.addEnergy()
        }, data.energy.refresh - Date.now())
    }
}

export { EnergyController }