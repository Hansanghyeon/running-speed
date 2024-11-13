import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import {DistanceTime } from './distance-time'
import { PaceSpeed, usePaceSpeedAtom } from './pace-speed'


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
      const accelerationValue = (speedValue * 1000) / (totalTimeInHours * 3600)
      setAcceleration(accelerationValue.toFixed(2))
    }
  }
}

function App() {

  const set = usePaceSpeedAtom.set()

  const reset = () => {
    set({ pace: { value1: '0', value2: '0' }, speed: '0', acceleration: '0' })
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
    <div className="container mx-auto max-w-[800px] grid gap-4 grid-cols-2 mt-[120px]">
      <div className="col-span-2">
        <Card className="">
          <CardHeader>
            <CardTitle>
              거리, 시간, 페이스, 속도 상호환산기
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 text-sm">
              <p>아래의 계산기는 두가지 기능을 가지고 있다.</p>
              <p>1) 먼저 달린 거리와 기록(시간)을 입력하면 페이스, 속도(시속, 초속)가 산출된다.</p>
              <p>2) 아래의 출력부분에서는 페이스를 속도(시속)로, 속도를 페이스로 전환이 가능하다.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2">
      </div>
      <div>
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
      <div>
        <PaceSpeed />
      </div>
    </div>
  )
}

export default App
