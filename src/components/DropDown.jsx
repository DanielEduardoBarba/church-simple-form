import { useEffect, useReducer, useRef, useState } from "react"
import { outClick } from "../scripts/tools"


export default function DropDown({ list = [{ name: "Default", value: "" }], maxH = 200, color, prefixI = 0, prefix = "", selectFx = () => { } }) {
    const [show, setShow] = useState("")
    const [title, setTitle] = useState("")
    const ref = useRef(null)
    useEffect(() => {
        if (!list) return
        setTitle(list[prefixI].name)
    }, [])
    useEffect(() => outClick(() => {
        setShow(false)
    }, ref), [])
    return (
        <div ref={ref} className="relative flex flex-row justify-center">
            <button onClick={() => [
                setShow(s => s ? false : true)
            ]} style={{
                backgroundColor: color
            }} className="default-button text-sm whitespace-nowrap">
                {prefix} {title}
            </button>


            {
                show && list.length
                    ? <div style={{
                        backgroundColor: "white",
                        maxHeight: maxH
                    }} className="absolute top-full right-[10%] border-2 p-2 rounded-xl overflow-scroll">
                        {list.map((item, i) => <button key={i} onClick={() => {
                            selectFx(item?.value)
                            setTitle(item?.name)
                            setShow(false)
                        }} style={{
                            backgroundColor: color
                        }} className="default-button w-full m-0 my-1 shadow-none text-sm whitespace-nowrap">
                            {prefix} {item?.name}
                        </button>)
                        }
                    </div>
                    : null
            }
        </div>
    )
}