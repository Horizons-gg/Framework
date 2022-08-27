// External Dependencies
import * as fs from 'fs'
import type { Theme as Model } from '@models/theme'

let Themes: { [key: string]: Model } = {}
const Config = JSON.parse(fs.readFileSync('./themes.json', 'utf8'))

for (const obj in Config) {
    const Theme: Model = Config[obj]
    Themes[obj] = Theme
}

export default Themes