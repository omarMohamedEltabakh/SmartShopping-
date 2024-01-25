import { useEffect, useState } from "react";

const DarkMode = () => {

    // darkMode toggle ======================>
    const [themeToggle, setthemeToggle] = useState(localStorage.getItem("themeToggle") ?? "light")
    useEffect(() => {
        document.body.classList.add("light")

        if (themeToggle === "dark") {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        }
        else {
            document.body.classList.add("light")
            document.body.classList.remove("dark")
        }

    }, [themeToggle])
    return <>
      {/* themeToggle==============================================> */}
      <div onClick={() => { localStorage.setItem("themeToggle", themeToggle === "light" ? "dark" : "light"); setthemeToggle(localStorage.getItem("themeToggle")) }} className="themeIcon    ">
            <div className='pe-1'>🌙</div>
            <div className=''>🌚</div>

            <div style={themeToggle === "light" ? { right: 0 } : { left: 0 }} className="switcher  "></div>
          </div>
    </>
}


export default DarkMode;
