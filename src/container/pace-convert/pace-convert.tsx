import { pipe, flow } from 'fp-ts/function'
import { PaceSpeed, usePaceSpeedAtom } from ".";
import { PaceForm } from "./partials/pace-form/pace-form";
import { RESET } from 'jotai/utils';

function calculate({
  min,
  sec
}: {
  min: number
  sec: number
}) {
  const pace = min + sec / 60
  const speed = 60 / pace

  const acceleration = speed / 3.6
  return {
    speed: speed.toFixed(2),
    acceleration: acceleration.toFixed(2),
  }
}

export function PaceConvert() {
  const set = usePaceSpeedAtom.set()
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className='[&>*]:h-full'>
        <PaceForm
          onSubmit={flow(
            e => ({ min: Number(e.분), sec: Number(e.초) }),
            calculate,
            e => {
              set(prv => ({ ...prv, ...e }))
            }
          )}
          onReset={() => {
            set(RESET)
          }}
        />

      </div>
      <div className='[&>*]:h-full'>
        <PaceSpeed />
      </div>
    </div>
  )
}
