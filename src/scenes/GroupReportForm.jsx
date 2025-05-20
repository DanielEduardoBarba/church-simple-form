import { useEffect, useState } from "react"
import DropDown from "../components/DropDown"
import INFO from "../groups_info.json"
import { server } from "../scripts/api"
import { getTag } from "../scripts/tools"
import Input from "../components/Input"

export default function GroupReportForm() {
    const [group, setGroup] = useState({})
    const [meeting, setMeeting] = useState({})
    const [isVisitors, setIsVisitors] = useState(false)
    const [isKids, setIsKids] = useState(false)
    const [isOffering, setIsOffering] = useState(false)

    const submitForm = () => {

        // fetchMeeting()
        console.log("group:", group)
        console.log("meeting:", meeting)
        if (!isReadySubmit()) {
            console.log("Not ready to submit....")
            return
        }
        console.log("submiting...")
        return
        fetch(`${server()}/groups/report`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                report: {
                    meeting,
                    group
                }
            })
        }).then(incoming => incoming.json())
            .then(data => {
                console.log(data)
            }).catch(console.error)
    }

    const fetchMeeting = () => {
        meeting["offering"] = Number(getTag("offering-dollars")?.value || 0) + (Number(getTag("offering-cents")?.value || 0) / 100)
        meeting["kids"] = Number(getTag("num-kids")?.value || 0)
        meeting["visitors"] = Number(getTag("num-visitors")?.value || 0)
        meeting["comments"] = getTag("comments")?.value || ""
        setMeeting(meeting)
    }

    const isReadySubmit = () => {
        let isOK = true

        for (const key of ["offering", "kids", "visitors", "comments"]) {
            console.log("Meeting", key, meeting[key])
            if (meeting[key] === undefined) isOK = false
        }
        for (const key of ["district", "zone", "leader", "group"]) {
            console.log("Group", key, group[key])
            if (group[key] === undefined) isOK = false
        }
        return isOK
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-start">
                <div className="">
                    <p className="text-sm">District</p>
                    <DropDown color={"gray"} required={true}
                        list={INFO.LISTS.DISTRICTS} maxH={200}
                        selectFx={(v) => {
                            group["district"] = v
                            setGroup(group)
                        }} />
                </div>
                <div className="">
                    <p className="text-sm">Zone</p>
                    <DropDown color={"gray"} required={true}
                        list={INFO.LISTS.ZONES} maxH={200}
                        selectFx={(v) => {
                            group["zone"] = v
                            setGroup(group)
                        }} />
                </div>
            </div>
            <div className="flex flex-row">
                <div className="">
                    <p className="text-sm">Leader</p>
                    <DropDown color={"gray"} required={true}
                        list={INFO.LISTS.LEADERS} maxH={200}
                        selectFx={(v) => {
                            group["leader"] = v
                            setGroup(group)
                        }} />
                </div>
                <div className="">
                    <p className="text-sm">Group</p>
                    <DropDown color={"gray"} required={true}
                        list={INFO.LISTS.GROUPS} maxH={200}
                        selectFx={(v) => {
                            console.log(v)
                            group["group"] = v
                            setGroup(group)
                        }} />
                </div>
            </div>
            <div className="w-1/2">
                <div className="">
                    <p className="text-sm">Number of Kids</p>
                    <Input _key={"num-kids"} isNumeric={true}
                        inputFx={(target) => {
                            if (Number(target.value) < 0) {
                                target.value = 0
                            }
                            meeting["kids"] = Number(target.value || 0)
                            setMeeting(meeting)
                            setIsKids(true)
                        }} />
                </div>
                <div className="">
                    <p className="text-sm">Number of Visitors</p>
                    <Input _key={"num-visitors"} isNumeric={true}
                        inputFx={(target) => {
                            if (Number(target.value) < 0) {
                                target.value = 0
                            }
                            meeting["visitors"] = Number(target.value || 0)
                            setMeeting(meeting)
                            setIsVisitors(true)
                        }} />
                </div>
                <div className="">
                    <p className="text-sm">Offering</p>
                    <div className="w-full flex flex-row ">
                        <div className="w-3/4">


                            <Input _key={"offering-dollars"} isNumeric={true}
                                inputFx={(target) => {
                                    if (Number(target.value) < 0) {
                                        target.value = 0
                                    }
                                    const _v = meeting["offering"] || 0
                                    meeting["offering"] = Number(target.value || 0) + (_v - Math.floor(_v))
                                    setMeeting(meeting)
                                    setIsVisitors(true)
                                }} />
                        </div>
                        <p className="text-3xl px-2">.</p>

                        <div className="w-1/2">
                            <Input _key={"offering-cents"} isNumeric={true}
                                placeholder={"00"}
                                inputFx={(target) => {
                                    if (Number(target.value) < 0) {
                                        target.value = 0
                                    }
                                    if (Number(target.value) > 99) {
                                        target.value = 99
                                    }
                                    const _v = meeting["offering"] || 0
                                    meeting["offering"] = Math.floor(_v) + (Number(target.value || 0) / 100)
                                    setMeeting(meeting)
                                    setIsVisitors(true)
                                }} />
                        </div>

                    </div>
                </div>
                <div className="w-full">
                    <p className="text-sm">Comments</p>
                    <Input _key={"comments"}  
                        placeholder={"Write here..."}
                        inputFx={(target) => {
                            meeting["comments"] = target.value || ""
                            setMeeting(meeting)
                        }} />
                </div>
                <button onClick={submitForm} className="default-button">Submit</button>
            </div>
        </div>
    )
}