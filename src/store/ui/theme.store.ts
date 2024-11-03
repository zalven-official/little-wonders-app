import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import BusinessBackground from '@/assets/business-bg.png'
import BusinessCover from '@/assets/business-cv.png'

import DarkBackground from '@/assets/dark-bg.png'
import DarkCover from '@/assets/dark-cv.png'

import EmeraldBackground from '@/assets/emerald-bg.png'
import EmeraldCover from '@/assets/emerald-cv.png'

import ForestBackground from '@/assets/forest-bg.png'
import ForestCover from '@/assets/forest-cv.png'

import GoldBackground from '@/assets/gold-bg.png'
import GoldCover from '@/assets/gold-cv.png'

import LightBackground from '@/assets/light-bg.png'
import LightCover from '@/assets/light-cv.png'

import NightBackground from '@/assets/night-bg.png'
import NightCover from '@/assets/night-cv.png'

import PastelBackground from '@/assets/pastel-bg.png'
import PastelCover from '@/assets/pastel-cv.png'

import ValentineBackground from '@/assets/valentine-bg.png'
import ValentineCover from '@/assets/valentine-cv.png'

import WinterBackground from '@/assets/winter-bg.png'
import WinterCover from '@/assets/winter-cv.png'

import posterImage from '@/assets/littlewonder/poster.png'


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
      label: 'Little Wonders',
      value: 'wonder',
      image: posterImage,
      background: posterImage,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Morning Winter',
      value: 'winter',
      image: WinterCover,
      background: WinterBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Emerald Landscape',
      value: 'emerald',
      image: EmeraldCover,
      background: EmeraldBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'School Facility',
      value: 'light',
      image: LightCover,
      background: LightBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Noir Luna',
      value: 'luxury',
      image: GoldCover,
      background: GoldBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Dark Space',
      value: 'dark',
      image: DarkCover,
      background: DarkBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Home Office',
      value: 'business',
      image: BusinessCover,
      background: BusinessBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Pastel World',
      value: 'pastel',
      image: PastelCover,
      background: PastelBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Night Sky',
      value: 'night',
      image: NightCover,
      background: NightBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },
    {
      label: 'Nocturnal Woods',
      value: 'forest',
      image: ForestCover,
      background: ForestBackground,
      backgrounOpacity: 1,
      backgroundBlur: 0,
      imageOpacity: 1,
      imageBlur: 0,
    },

    {
      label: 'Valentines Day',
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