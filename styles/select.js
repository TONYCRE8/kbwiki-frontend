/* import {DATA} from "../lib/dataFetch"

const selectTheme = {

  container: (provided) => ({
    ...provided,
    border: 'none',
    ":active": {
      border: 'none'
    }
  }),

  control: (provided) => ({
    ...provided,
    border: 'none',
    background: 'none',
    boxShadow: 'none'
  }),

  option: (provided) => ({
    ...provided,
    border: 'none',
    background: 'var(--bg-color)',
    color: 'var(--text-color)'
  }),

  valueContainer: (provided) => ({
    ...provided,
    minWidth: '212px',
    background: 'var(--bg-color)',
    border: 'none'
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none"
  }),

  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-color)',
    background: 'var(--bg-accent)',
    padding: '2px 12px 2px 8px',
    borderRadius: '4px',
    borderLeft: '4px solid var(--primary-color)'
  }),

  multiValue: (provided) => ({
    ...provided,
    color: 'var(--text-color)',
    background: 'var(--bg-accent)',
    padding: '2px 12px 2px 8px',
    borderRadius: '4px',
    borderLeft: '4px solid var(--primary-color)'
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--text-color)',
    fontFamily: "inter-regular, sans-serif"
  }),

  menu: (provided) => ({
    ...provided,
    borderColor: "var(--bg-accent)"
  }), 

  menuList: (provided) => ({
    ...provided,
    background: "var(--bg-color)"
  })

} */

import {DATA} from "../lib/dataFetch"

const selectTheme = {
    option: (provided, state) => ({
      color: state.isSelected ? "white" : "var(--text-color)",
      background: state.isSelected ? `var(--secondary-color)` : "var(--bg-color)",
      padding: "4px 8px",
      minWidth: "72px",
      fontSize: '14px',
      textAlign: "center",
      borderRadius: 16,
      margin: "2px",
      ":active": {
          backgroundColor: "var(--secondary-color)",
          color: "white"
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
      width: 64
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

const getData = (state) => {
    const color = DATA(`keycap-colors?color=${state.label}`)
    var hexColor = null
    color.data.map((col) => {
      hexColor = `#${col.hex}`
    })
    return {hexColor}
  }

const colorSelectTheme = {
  option: (provided, state) => {
    const color = getData(state)
    return {
      color: state.isSelected ? "white" : "#222A31",
      background: state.isSelected ? `${color.hexColor}` : "white",
      padding: "4px",
      width: "80px",
      fontSize: '14px',
      textAlign: "center",
      borderRadius: 16,
      borderLeft: `${color.hexColor} solid 16px`,
      margin: "2px",
      paddingRight: "12px",
      ":active": {
          backgroundColor: "var(--secondary-color)",
          color: "white"
      }
    }
  },
  control: (provided) => ({
    ...provided,
    background: "none",
    border: "none",
  }),
  container: () => ({
    display: "flex",
    flexFlow: "row-reverse wrap"
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
    width: "80%"
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
export {selectTheme, colorSelectTheme}

/* export {selectTheme} */