import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import EmeraldBackground from '@/assets/emerald-bg.png'
import EmeraldCover from '@/assets/emerald-cv.png'
import ForestBackground from '@/assets/forest-bg.png'
import ForestCover from '@/assets/forest-cv.png'
import NightBackground from '@/assets/night-bg.png'
import NightCover from '@/assets/night-cv.png'
import PastelCover from '@/assets/pastel-cv.png'
import PastelBackground from '@/assets/pastel-bg.png'
import ValentineCover from '@/assets/valentine-cv.png'
import ValentineBackground from '@/assets/valentine-bg.png'
import WinterCover from '@/assets/winter-cv.png'
import WinterBackground from '@/assets/winter-bg.png'

interface Theme {
  label: string
  value: string
  image: string
  background: string
  backgrounOpacity: number
  backgroundBlur: number
  imageOpacity: number,
  imageBlur: number
}
interface ThemeSizes {
  value: string,
  label: string,
}

const sizes: ThemeSizes[] = [
  { value: "none", label: 'None' },
  { value: "sm", label: 'Small' },
  { value: "md", label: 'Medium' },
  { value: "lg", label: 'Large' },
  { value: "xl", label: 'Extra Large' },
  { value: "2xl", label: '2x Extra Large' },
  { value: "3xl", label: '3x Extra Large' },
]


export const useThemeStore = defineStore('theme', () => {


  const themes = ref<Theme[]>([
    {
      label: 'Emerald',
      value: 'emerald',
      image: EmeraldCover,
      background: EmeraldBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Pastel',
      value: 'pastel',
      image: PastelCover,
      background: PastelBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Night',
      value: 'night',
      image: NightCover,
      background: NightBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Forest',
      value: 'forest',
      image: ForestCover,
      background: ForestBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Winter',
      value: 'winter',
      image: WinterCover,
      background: WinterBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Valentine',
      value: 'valentine',
      image: ValentineCover,
      background: ValentineBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    }
  ])

  const theme = ref<Theme>(themes.value[0])


  const backgroundOpacity = computed(() => percentageConverter(theme.value.backgrounOpacity))
  const backgroundBlur = computed(() => sizeConverter(theme.value.backgroundBlur))
  const imageOpacity = computed(() => percentageConverter(theme.value.imageOpacity))
  const imageBlur = computed(() => sizeConverter(theme.value.imageBlur))

  function percentageConverter(value: number) {
    return Math.trunc(value * 100)
  }

  function sizeConverter(value: number) {
    return sizes[value]
  }

  function changeTheme(selectedTheme: Theme) {
    theme.value = selectedTheme
  }

  function setDefaultThemeSettings() {

    theme.value.backgrounOpacity = 1
    theme.value.backgroundBlur = 0
    theme.value.imageOpacity = 1
    theme.value.imageBlur = 0
  }

  return {
    themes,
    theme,
    backgroundOpacity,
    backgroundBlur,
    imageOpacity,
    imageBlur,
    sizeConverter,
    percentageConverter,
    changeTheme,
    setDefaultThemeSettings
  }
})