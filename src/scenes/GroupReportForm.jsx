import { useState } from "react"
import DropDown from "../components/DropDown"
import INFO from "../groups_info.json" 

export default function GroupReportForm() {

    const submitForm = () => {
        console.log("submiting...")
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <DropDown color={"gray"} prefix={"Districto"} 
            list={INFO.LISTS.DISTRICTS} maxH={200} />

            <div className="w-1/2">
                <div className="">
                    <p className="text-sm">Number of Kids</p>
                    <input id="num-kids"
                        type="tel" pattern="[0-9]*" inputmode="numeric"
                        placeholder="#"
                        className="default-input" />
                </div>
                <div className="">
                    <p className="text-sm">Number of Visitors</p>
                    <input id="num-visitors"
                        type="tel" pattern="[0-9]*" inputmode="numeric"
                        placeholder="#"
                        className="default-input" />
                </div>
                <div className="">
                    <p className="text-sm">Offering</p>
                    <div className="w-full flex flex-row ">
                        <input id="offering-dollars"
                            type="number"
                            inputmode="numeric"
                            placeholder="USD"
                            className="default-input w-full" />
                        <p className="text-3xl">.</p>
                        <input id="offerin-cents"
                        onInput={(e)=>{
                            if(String(e.target.value).length>2){
                                e.target.value=String(e.target.value).substring(0,2)
                            }
                        }}
                            type="number"
                            inputmode="numeric"
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