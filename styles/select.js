const selectTheme = {
    option: (provided, state) => ({
        color: state.isSelected ? "white" : "var(--text-color)",
        background: state.isSelected ? "var(--secondary-color)" : "var(--bg-accent)",
        padding: "4px",
        width: "100px",
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
      })
}
export default selectTheme