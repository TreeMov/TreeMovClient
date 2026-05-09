export type GroupSelectContextType = {
  selectedIds: number[]
  hasSelectedIds: boolean
  isSelected: (id: number) => boolean
  onCheckChange: (id: number) => void
  onReset: () => void
}
