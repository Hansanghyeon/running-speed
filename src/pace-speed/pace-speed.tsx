import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { usePaceSpeedAtom } from './pace-speed.store'

export function PaceSpeed() {
  const { pace, speed, acceleration } = usePaceSpeedAtom.get()

  return <Card className="flex-1 h-full">
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
}