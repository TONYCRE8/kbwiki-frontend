/*
const getData = (state) => {
    const color = DATA(`keycap-colors?color=${state.label}`)
    var hexColor = null
    color.data.map((col) => {
      hexColor = `#${col.hex}`
    })
    return {hexColor}
  }
*/

import {DATA} from "../lib/dataFetch"

const selectTheme = {
    option: (provided, state) => ({
      color: "var(--bg-color)",
      background: state.isSelected ? `var(--secondary-color)` : "var(--text-color)",
      padding: "4px 8px",
      minWidth: "72px",
      fontSize: '14px',
      textAlign: "center",
      borderRadius: 16,
      margin: "2px 4px",
      fontFamily: state.isSelected ? "inter-semibold" : "inter-regular",
      cursor: "pointer",
      ":active": {
          backgroundColor: "var(--secondary-color)",
          color: "var(--bg-color)",
          fontFamily: "inter-semibold"
      },
      "@media only screen and (max-width: 1023px)": {
        width: "120px",
        fontSize: "16px",
        padding: "8px"
      }
    }),
    selectContainer: (provided) => ({
      display: "flex",
      flexFlow: "row-reverse nowrap"
    }),
    control: (provided) => ({
      ...provided,
      background: "none",
      border: "none",
      display: "none"
    }),
    container: () => ({
      display: "flex",
      flexFlow: "row-reverse nowrap"
    }),
    dropdownIndicator: () => ({
      display: "none"
    }),
    indicatorSeparator: () => ({
      display: "none"
    }),
    indicatorsContainer: () => ({
      width: 100
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "var(--text-color)"
    }),
    menu: () => ({
      background: "none",
    }),
    menuList: () => ({
      display: "flex",
      flexFlow: "row wrap",
      width: "auto",
    }),
    valueContainer: (provided) => ({
        ...provided,
        display: "none"
    }),
    loadingMessage: () => ({
      color: "var(--text-color)"
    }),
}


export {selectTheme}

/* export {selectTheme} */