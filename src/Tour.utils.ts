export const startingZIndex = 100100

export type FocusedElementProps = {
  id: string
  padding?: number
  shouldNotChangeZIndex?: boolean
  modalProps?: {
    horizontal: 'left' | 'center' | 'right'
    vertical: 'top' | 'center' | 'bottom'
    relativeTo: 'screen' | 'element'
    className: string
    children: JSX.Element
  }
}

export type ModalProps = {
  horizontal: 'left' | 'center' | 'right'
  vertical: 'top' | 'center' | 'bottom'
  relativeTo: 'screen' | 'element'
  className?: string
  children?: JSX.Element
}

export type StepProps = {
  levels: FocusedElementProps[][]
  modalProps?: ModalProps
}
export type TourProps = {
  steps: Array<StepProps>
}

export type SVGProps = {
  x: number
  y: number
  width: number
  height: number
  rx: number
}

export const defaultModalProps: ModalProps = {
  horizontal: 'center',
  vertical: 'center',
  relativeTo: 'screen',
  className: 'info_modal',
}

export const getFocusedElement = (step: StepProps): DOMRect | null => {
  const { id } = step.levels[0][0]
  const focusedElement = document.querySelector<HTMLElement>(id)
  if (focusedElement) {
    return focusedElement.getBoundingClientRect()
  }
  return null
}
