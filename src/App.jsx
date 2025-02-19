
import { useEffect, useState } from 'react'
import { setServer } from './scripts/api'
import GroupReportForm from './scenes/GroupReportForm.jsx'
import './styling/app.css'

export default function App() {
  const [scene, setScene] = useState(0)

useEffect(()=>{
setServer()
},[])
  return (
    <main className="app-container ">

      <div className="dashboard-container ">
        {
          scene == 0
            ? <GroupReportForm />
            : <p>Hey who told you to be here? scene:{scene}</p>
        }
      </div>

    </main>
  )
}


