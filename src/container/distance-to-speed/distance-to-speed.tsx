import { RESET } from 'jotai/utils'
import { PaceSpeed, usePaceSpeedAtom, DistanceTime } from '.'

function calculate({ hours, minutes, seconds, distance }: {
  hours: string
  minutes: string
  seconds: string
  distance: string
}) {
  return function ({ setSpeed, setPace, setAcceleration }: {
    setSpeed: (value: string) => void
    setPace: (value: { value1: string; value2: string }) => void
    setAcceleration: (value: string) => void
  }) {
    const totalTimeInHours = Number(hours) +
      Number(minutes) / 60 +
      Number(seconds) / 3600

    console.log('totalTimeInHours', totalTimeInHours)
    const distanceNum = Number(distance)
    console.log('distanceNum', distanceNum)

    if (totalTimeInHours && distanceNum) {
      // Calculate speed (km/h)
      const speedValue = distanceNum / totalTimeInHours
      setSpeed(speedValue.toFixed(2))

      // Calculate pace (min/km)
      const paceMinutes = (totalTimeInHours * 60) / distanceNum
      setPace({
        value1: Math.floor(paceMinutes).toString(),
        value2: Math.round((paceMinutes % 1) * 60).toString()
      })

      // Calculate acceleration (m/s)
      const accelerationValue = (speedValue * 1000) / 3600
      setAcceleration(accelerationValue.toFixed(2))
    }
  }
}

export function DistanceToSpeed() {
  const set = usePaceSpeedAtom.set()

  const reset = () => {
    set(RESET)
  }

  const setSpeed = (s: string) => {
    set(pre => ({ ...pre, speed: s }))
  }
  const setPace = (p: { value1: string; value2: string }) => {
    set(pre => ({ ...pre, pace: p }))
  }
  const setAcceleration = (a: string) => {
    set(pre => ({ ...pre, acceleration: a }))
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className='[&>*]:h-full'>
        <DistanceTime
          onSubmit={(payload) => calculate({
            hours: payload.시간,
            minutes: payload.분,
            seconds: payload.초,
            distance: payload.거리
          })({
            setSpeed,
            setPace,
            setAcceleration
          })}
          onReset={() => {
            reset()
          }}
        />
      </div>
      <div className='[&>*]:h-full'>
        <PaceSpeed />
      </div>
    </div>
  )
}
