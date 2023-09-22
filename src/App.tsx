import { useEffect, useState } from 'react'
import './App.css'
import { DateUtils, IIsPartyTime } from './utils/DateUtils';

function App() {

  const [isPartyTime, setIsPartyTime] = useState<IIsPartyTime | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const isPartyTime = DateUtils.isPartyTime(currentDate);
      setIsPartyTime(isPartyTime);
    }, 1000)
    return () => clearInterval(interval);
  }, [])

  return (
    <div className={`wrapper ${isPartyTime?.is ? "is-party-time" : "is-not-party-time"}`}>
      <div className='time-left-text'>
        {isPartyTime && DateUtils.formatTimeLeft(isPartyTime.left)}
      </div>
    </div>
  )
}

export default App
