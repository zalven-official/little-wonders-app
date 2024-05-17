import { defineStore } from 'pinia'
import { ref } from 'vue'

import EmeraldBackground from '@/assets/emerald-bg.png'
import EmeraldCover from '@/assets/emerald-cv.png'
import ForestBackground from '@/assets/forest-bg.png'
import ForestCover from '@/assets/forest-cv.png'
import NightBackground from '@/assets/night-bg.png'
import NightCover from '@/assets/night-cv.png'
import PastelCover from '@/assets/pastel-cv.png'
import PastelBackground from '@/assets/pastel-bg.png'

interface Theme {
  label: string
  value: string
  image: string
  background: string
  backgrounOpacity: number
}
export const useThemeStore = defineStore('theme', () => {
  const themes = ref<Theme[]>([
    {
      label: 'Emerald',
      value: 'emerald',
      image: EmeraldCover,
      background: EmeraldBackground,
      backgrounOpacity: .8
    },
    {
      label: 'Pastel',
      value: 'pastel',
      image: PastelCover,
      background: PastelBackground,
      backgrounOpacity: .8
    },
    {
      label: 'Night',
      value: 'night',
      image: NightCover,
      background: NightBackground,
      backgrounOpacity: .8
    },
    {
      label: 'Forest',
      value: 'forest',
      image: ForestCover,
      background: ForestBackground,
      backgrounOpacity: .8
    },

  ])


  const theme = ref<Theme>(themes.value[0])

  function changeTheme(selectedTheme: Theme) {
    theme.value = selectedTheme
  }

  return {
    themes,
    theme,
    changeTheme,
  }
})