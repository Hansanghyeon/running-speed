import React from 'react'
import { pipe, flow } from 'fp-ts/function'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'

function App() {
  const [distance, setDistance] = React.useState('0')
  const [hours, setHours] = React.useState('0')
  const [minutes, setMinutes] = React.useState('0')
  const [seconds, setSeconds] = React.useState('0')
  const [pace, setPace] = React.useState({ value1: '0', value2: '0' })
  const [speed, setSpeed] = React.useState('0')
  const [acceleration, setAcceleration] = React.useState('0')

  const calculate = () => {
    const totalTimeInHours =
      Number(hours) +
      Number(minutes) / 60 +
      Number(seconds) / 3600

    const distanceNum = Number(distance)

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

  function formatingTextToNumber(v: string) {
    const _value = v
      .replaceAll(/[^0-9]/g, '')
      .replace(/^(0+)(?=\d{2})/, '')
    return _value
  }

  const reset = () => {
    setDistance('0')
    setHours('0')
    setMinutes('0')
    setSeconds('0')
    setPace({ value1: '0', value2: '0' })
    setSpeed('0')
    setAcceleration('0')
  }

  //

  return (
    <div className="container mx-auto max-w-[800px] grid gap-4 grid-cols-2 gap-4 mt-[120px]">
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
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              거리, 시간, 페이스
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span>달린 거리</span>
                <Input
                  type="text"
                  value={distance}
                  onChange={flow((e) => e.target.value, formatingTextToNumber, setDistance)}
                  className="w-24"
                />
                km
              </div>

              <div>
                <div className="flex items-center gap-2 mt-2">
                  <span>소요시간:</span>
                  <Input
                    type="text"
                    value={hours}
                    onChange={flow((e) => e.target.value, formatingTextToNumber, setHours)}
                    className="w-24"
                  />
                  <span>시간</span>

                  <Input
                    type="text"
                    value={minutes}
                    onChange={flow((e) => e.target.value, formatingTextToNumber, setMinutes)}
                    className="w-24"
                  />
                  <span>분</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={calculate}>산출하기</Button>
                <Button variant="outline" onClick={reset}>다시하기</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="flex-1 h-full">
          <CardHeader>
            <CardTitle>
              출력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label>페이스(km):</Label>
                <Input value={pace.value1} readOnly className="w-20" />
                <span>:</span>
                <Input value={pace.value2} readOnly className="w-20" />
                <span>/km</span>
              </div>

              <div className="flex items-center gap-2">
                <Label>시속(km):</Label>
                <Input value={speed} readOnly className="w-32" />
                <span>km/h</span>
              </div>

              <div className="flex items-center gap-2">
                <Label>초속(m):</Label>
                <Input value={acceleration} readOnly className="w-32" />
                <span>m/s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
