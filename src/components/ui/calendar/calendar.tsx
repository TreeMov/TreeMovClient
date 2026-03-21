import type { NonUndefinedFields } from '@/types/utility'
import type { CalendarDayButtonProps, CalendarProps } from './types'

import { format, isEqual } from 'date-fns'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import * as React from 'react'
import {
  type DateRange,
  DayPicker,
  getDefaultClassNames,
} from 'react-day-picker'
import { ru } from 'react-day-picker/locale'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/helpers//shadcn'

import { Popover, PopoverContent, PopoverTrigger } from '../popover'

const formatValue = 'yyyy-MM-dd'

const defaultRange: Required<NonUndefinedFields<DateRange>> = {
  from: new Date(),
  to: new Date(),
}

const formatDate = (date: Date) => format(date, formatValue)

const Calendar: React.FC<CalendarProps> = (props) => {
  const { mode, placeholder } = props

  const getRangeLabel = (selected: DateRange) => {
    const from = formatDate(selected.from ?? defaultRange.from)
    const to = formatDate(selected.to ?? defaultRange.to)

    if (isEqual(from, to)) {
      return format(from, formatValue)
    } else {
      return [from, to].filter(Boolean).join(' - ')
    }
  }

  const getSingleLabel = (date: Date | undefined) =>
    formatDate(date ?? new Date())

  const getLabel = () => {
    switch (mode) {
      case 'range':
        return props.selected
          ? getRangeLabel(props.selected)
          : placeholder
      case 'single':
        return props.selected
          ? getSingleLabel(props.selected)
          : placeholder
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outlined">{getLabel()}</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <CalendarCard {...props} />
      </PopoverContent>
    </Popover>
  )
}

const CalendarCard: React.FC<CalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}) => {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ru}
      className={cn(
        'group/calendar bg-background p-3 [--cell-size:--spacing(10)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months
        ),
        month: cn(
          'flex w-full flex-col gap-4',
          defaultClassNames.month
        ),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          'absolute inset-0 bg-popover opacity-0',
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          'font-medium select-none',
          captionLayout === 'label'
            ? 'text-sm'
            : 'flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none',
          defaultClassNames.weekday
        ),
        week: cn('first:mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-(--cell-size) select-none',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-[0.8rem] text-muted-foreground select-none',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day inline-flex items-center justify-center relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md min-w-(--cell-size) min-h-(--cell-size)',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-md'
            : '[&:first-child[data-selected=true]_button]:rounded-l-md',
          defaultClassNames.day
        ),
        range_start: cn(
          'rounded-l-md bg-accent',
          defaultClassNames.range_start
        ),
        range_middle: cn(
          'rounded-none',
          defaultClassNames.range_middle
        ),
        range_end: cn(
          'rounded-r-md bg-accent',
          defaultClassNames.range_end
        ),
        today: cn(
          'rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon
                className={cn('size-4', className)}
                {...props}
              />
            )
          }
          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
              />
            )
          }
          return (
            <ChevronDownIcon
              className={cn('size-4', className)}
              {...props}
            />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

const CalendarDayButton = ({
  className,
  day,
  modifiers,
  children,
  ...props
}: CalendarDayButtonProps) => {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const dataAttributes = {
    'data-day': day.date.toLocaleDateString(),
    'data-selected-single':
      modifiers.selected &&
      !modifiers.range_start &&
      !modifiers.range_end &&
      !modifiers.range_middle,

    'data-range-start': modifiers.range_start,
    'data-range-end': modifiers.range_end,
    'data-range-middle': modifiers.range_middle,
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-xs"
      {...dataAttributes}
      className={cn(
        cn(
          'relative flex aspect-square min-h-(--cell-size) min-w-(--cell-size) flex-col gap-1 leading-none font-normal [&>span]:text-xs [&>span]:opacity-70',
          'dark:hover:text-accent-foreground',
          'group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]',
          'data-[range-middle=true]:rounded-none',
          {
            'text-white':
              dataAttributes['data-selected-single'] ||
              dataAttributes['data-range-end'] ||
              dataAttributes['data-range-start'],
          }
        ),
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      <div
        {...dataAttributes}
        className={cn(
          'flex h-6 w-full items-center justify-center',
          'data-[range-middle=true]:bg-purple-500/30',
          {
            'after:absolute after:h-6 after:w-1/2 after:bg-purple-500/30':
              dataAttributes['data-range-end'] ||
              dataAttributes['data-range-start'],
            'after:-translate-x-1/2':
              dataAttributes['data-range-end'],
            'after:translate-x-1/2':
              dataAttributes['data-range-start'],
          }
        )}
      >
        <div
          {...dataAttributes}
          className={cn(
            'relative z-10 flex size-6 items-center justify-center',
            {
              'rounded-full bg-purple-500':
                dataAttributes['data-range-end'] ||
                dataAttributes['data-range-start'] ||
                dataAttributes['data-selected-single'],
            }
          )}
        >
          {children}
        </div>
      </div>
    </Button>
  )
}

export { CalendarCard, Calendar, CalendarDayButton }
