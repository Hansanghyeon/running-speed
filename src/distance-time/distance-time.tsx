import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '../components/ui/button'
import { flow } from 'fp-ts/lib/function'
import { inputFormatTextNumber } from '../lib/input-format-textnumber'
import { InputTargetValue } from '../lib/input-target-value'
import { z } from 'zod'

const DistanceTimeRdo = z.object({
  거리: z.string(),
  시간: z.string(),
  분: z.string(),
  초: z.string(),
  초속: z.string(),
})
export type TDistanceTimeRdo = z.infer<typeof DistanceTimeRdo>

interface TDistanceTime {
  onSubmit?: (payload: TDistanceTimeRdo) => void
  onReset?: () => void
}
export function DistanceTime({ onSubmit, onReset }: TDistanceTime) {
  const form = useForm<TDistanceTimeRdo>({
    defaultValues: {
      거리: '0',
      시간: '0',
      분: '0',
      초: '0',
      초속: '0',
    }
  })

  const _onSubmit = form.handleSubmit(payload => {
    console.log(payload)
    onSubmit?.(payload)
  })

  const _onReset = () => {
    form.reset()
    onReset?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={_onSubmit}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              거리, 시간, 페이스
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="거리"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>달린 거리</FormLabel>
                  <FormControl>
                    <div className="flex items-end gap-2 mt-2">
                      <Input placeholder="42.195" {...field} onChange={flow(InputTargetValue, inputFormatTextNumber, field.onChange)} /><span className='pb-1.5'>km</span>
                    </div>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
            <div>
              <FormLabel>소요 시간</FormLabel>
              <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                <FormField
                  control={form.control}
                  name="시간"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-end gap-2">
                          <Input placeholder="42.195" {...field} onChange={flow(InputTargetValue, inputFormatTextNumber, field.onChange)} /><div className='pb-1.5 whitespace-nowrap'>시간</div>
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="분"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-end gap-2">
                          <Input placeholder="42.195" {...field} onChange={flow(InputTargetValue, inputFormatTextNumber, field.onChange)} /><span className='pb-1.5'>분</span>
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button type="submit">산출하기</Button>
              <Button variant="outline" type="reset" onClick={_onReset}>다시하기</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
