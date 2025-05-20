import { useEffect, useRef, useState } from "react"
import { getTag } from "../scripts/tools"


export default function Input({ _key, required, isNumeric, prefix, color, placeholder, inputFx = () => { } }) {
    const [didSelect, setDidSelect] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (prefix !== undefined) {
            getTag(_key).value = prefix
        }
    }, [])

    return (
        <div ref={ref}>
            {
                isNumeric
                    ? <input key={_key} style={{
                        backgroundColor: color,
                        border: required
                            ? didSelect
                                ? '2px solid green'
                                : '2px solid red'
                            : null
                    }} onInput={(e) => {
                        inputFx(e.target)
                        setDidSelect(true)
                    }} placeholder={placeholder}
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="default-input w-full" />
                    : <input key={_key} style={{
                        backgroundColor: color,
                        border: required
                            ? didSelect
                                ? '2px solid green'
                                : '2px solid red'
                            : null
                    }} onInput={(e) => {
                        inputFx(e.target)
                        setDidSelect(true)
                    }} placeholder={placeholder}
                        className="default-input w-full" />
            }
        </div>
    )
}