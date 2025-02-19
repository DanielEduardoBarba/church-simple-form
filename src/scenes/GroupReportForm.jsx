import { useState } from "react"
import DropDown from "../components/DropDown"
import INFO from "../groups_info.json"

export default function GroupReportForm() {
    const [group, setGroup] = useState({})
    const [meeting, setMeeting] = useState({})
    const submitForm = () => {
        fetchMeeting()
        console.log("submiting...")
        console.log("group:",group)
        console.log("meeting:",meeting)


    }
    const fetchMeeting=()=>{
        meeting["offering"]=Number(getTag("offering-dollars")?.value)+(Number(getTag("offering-cents")?.value)/100)
        meeting["kids"]=getTag("num-kids")?.value
        meeting["visitors"]=getTag("num-visitors")?.value
        meeting["comments"]=getTag("offering-dollars")?.value
        setMeeting(meeting)
    }
const getTag=(id)=>document.getElementById(id)
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-start">
                <div className="">
                    <p className="text-sm">District</p>
                    <DropDown color={"gray"}
                        list={INFO.LISTS.DISTRICTS} maxH={200}
                        selectFx={(v) => {
                            group["district"]=v
                            setGroup(group)
                        }} />
                </div>
                <div className="">
                    <p className="text-sm">Zone</p>
                    <DropDown color={"gray"}
                        list={INFO.LISTS.ZONES} maxH={200}
                        selectFx={(v) => {
                            group["zone"]=v
                            setGroup(group)
                        }} />
                </div>
            </div>
            <div className="flex flex-row">
                <div className="">
                    <p className="text-sm">Leader</p>
                    <DropDown color={"gray"}
                        list={INFO.LISTS.LEADERS} maxH={200}
                        selectFx={(v) => {
                            group["leader"]=v
                            setGroup(group)
                        }} />
                </div>
                <div className="">
                    <p className="text-sm">Group</p>
                    <DropDown color={"gray"}
                        list={INFO.LISTS.GROUPS} maxH={200}
                        selectFx={(v) => {
                            group["group"]=v
                            setGroup(group)
                        }} />
                </div>
            </div>
            <div className="w-1/2">
                <div className="">
                    <p className="text-sm">Number of Kids</p>
                    <input id="num-kids"
                        type="tel" pattern="[0-9]*" inputMode="numeric"
                        placeholder="#"
                        className="default-input" />
                </div>
                <div className="">
                    <p className="text-sm">Number of Visitors</p>
                    <input id="num-visitors"
                        type="tel" pattern="[0-9]*" inputMode="numeric"
                        placeholder="#"
                        className="default-input" />
                </div>
                <div className="">
                    <p className="text-sm">Offering</p>
                    <div className="w-full flex flex-row ">
                        <input id="offering-dollars"
                            type="number"
                            inputMode="numeric"
                            placeholder="USD"
                            className="default-input w-full" />
                        <p className="text-3xl">.</p>
                        <input id="offerin-cents"
                            onInput={(e) => {
                                if (String(e.target.value).length > 2) {
                                    e.target.value = String(e.target.value).substring(0, 2)
                                }
                            }}
                            type="number"
                            inputMode="numeric"
                            placeholder="00"
                            className="default-input  w-1/4 mr-0 pr-0" />
                    </div>
                </div>
                <div className="">
                    <p className="text-sm">Comments</p>
                    <input id="comments" className="default-input" />
                </div>
                <button onClick={submitForm} className="default-button">Submit</button>
            </div>
        </div>
    )
}