import {DATA} from "../components/dataFetch"

const selectTheme = {
    option: (provided, state) => ({
      color: state.isSelected ? "white" : "#222A31",
      background: state.isSelected ? `var(--secondary-color)` : "white",
      padding: "4px",
      width: "128px",
      textAlign: "center",
      borderRadius: 16,
      margin: "0 2px",
      ":active": {
          backgroundColor: "var(--secondary-color)",
          color: "white"
      }
    }),
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
const colorSelectTheme = {
  option: (provided, state) => {
    const data = DATA("keycap-colors").data
    //This runs 12 times, making 12 seperate calls. We want 1 call for all the colors.
    const color = data.find(el => el.color === state.label)
    var hexColor = "var(--bg-accent)"
    if (color) {
      hexColor = `#${color.hex}`
    }

    return {
      color: state.isSelected ? "white" : "#222A31",
      background: state.isSelected ? `${hexColor}` : "white",
      padding: "4px",
      width: "100px",
      textAlign: "center",
      borderRadius: 16,
      borderLeft: `${hexColor} solid 16px`,
      margin: "2px",
      paddingRight: "16px",
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