import { defineStore } from 'pinia'


export const useBionicStore = defineStore('bionic', () => {

  function convert(value: string, isBionic: boolean) {
    if (!value) {
      return 'No Storyline'
    }

    const data = value.trim().replace(/  +/g, ' ').split(' ')
    const result = data.map((elem) => {
      let preElem = elem;
      let showNewLine = false;
      const match = /\r|\n/.exec(elem);
      if (match) {
        preElem = elem.trim();
        showNewLine = true;
      }
      const mid = Math.floor(preElem.length / 2);
      let processedItem = '';

      if (isBionic)
        processedItem += `<span class='font-black''>${preElem.slice(0, mid)}</span>`
      else
        processedItem += `<span class='font-light'>${preElem.slice(0, mid)}</span>`

      if (showNewLine) {
        processedItem += '<br /><br />';
      }
      processedItem += `<span class='font-light'>${preElem.slice(mid)}</span>`;
      return processedItem
    })
    return result.join(' ')
  }

  return {
    convert
  }
})