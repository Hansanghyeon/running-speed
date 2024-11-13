import { flow } from 'fp-ts/function'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { inputFormatTextNumber } from '~/lib/input-format-textnumber'
import { InputTargetValue } from '~/lib/input-target-value'
import { z } from 'zod'

const PaceDto = z.object({
  분: z.string(),
  초: z.string(),
})
export type TPaceDto = z.infer<typeof PaceDto>

interface TPaceForm {
  onSubmit?: (payload: TPaceDto) => void
  onReset?: () => void
}
export function PaceForm({
  onSubmit,
  onReset,
}: TPaceForm) {
  const form = useForm<TPaceDto>({
    defaultValues: {
      분: '0',
      초: '0',
    }
  })

  const _onSubmit = form.handleSubmit((payload) => {
    onSubmit?.(payload)
  })
  const _onReset = () => {
    form.reset()
    onReset?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={_onSubmit} action=''>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              페이스(km)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className='grid grid-cols-[1fr,auto,1fr] items-center gap-2 w-full'>
              <FormField
                control={form.control}
                name="분"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} onChange={flow(InputTargetValue, inputFormatTextNumber, field.onChange)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <div>:</div>
              <FormField
                control={form.control}
                name="초"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} onChange={flow(InputTargetValue, inputFormatTextNumber, field.onChange)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
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
