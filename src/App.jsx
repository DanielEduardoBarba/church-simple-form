
import { useEffect, useState } from 'react'
import './styling/app.css'
import { isProd } from './scripts/api'
export default function App() {
  const [scene, setScene] = useState(0)

useEffect(()=>{
isProd()
},[])
  return (
    <main className="app-container">

      <div className="dashboard-container">
        {
          scene == 0
            ? null
            : <p>Hey who told you to be here? scene:{scene}</p>
        }
      </div>

    </main>
  )
}


