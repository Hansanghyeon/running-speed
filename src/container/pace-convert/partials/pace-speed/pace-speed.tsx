import { Form, FormDescription, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { usePaceSpeedAtom } from './pace-speed.store'
import { useForm } from 'react-hook-form'

/**
 * 
 */

export function PaceSpeed() {
  const { speed, acceleration } = usePaceSpeedAtom.get()

  const form = useForm()
  return <Form {...form}>
    <Card className="flex-1 h-full">
      <CardHeader>
        <CardTitle>
          출력
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <FormItem>
            <FormLabel>시속(km)</FormLabel>
            <div className="grid grid-cols-[1fr,40px] gap-2 mt-2">
              <Input readOnly value={speed} />
              <div className='flex items-center justify-end'>km/h</div>
            </div>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>초속(m)</FormLabel>
            <div className="grid grid-cols-[1fr,40px] gap-2 mt-2">
              <Input readOnly value={acceleration} />
              <div className='flex items-center justify-end'>m/s</div>
            </div>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        </div>
      </CardContent>
    </Card>
  </Form>

}