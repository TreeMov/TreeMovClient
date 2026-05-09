export type FooterProps = {
  deleteHandler: (id: number) => Promise<unknown>
  onDeleteSuccess: () => void
}
