import type * as ResizablePrimitive from 'react-resizable-panels'

export type ResizablePanelGroupProps = ResizablePrimitive.GroupProps

export type ResizablePanelProps = ResizablePrimitive.PanelProps

export type ResizableHandleProps =
  ResizablePrimitive.SeparatorProps & {
    withHandle?: boolean
  }
