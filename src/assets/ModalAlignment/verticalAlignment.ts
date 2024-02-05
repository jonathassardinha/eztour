import { ModalProps } from '../../Tour.utils'

type verticalAlignmentReturnTypes =
  | { top: number; transform?: string }
  | { top: string; transform: string }
  | { bottom: number; transform?: string }

const verticalToSreen = {
  top: () => {
    return { top: 0 }
  },
  center: () => {
    return {
      top: '50%',
      transform: 'translateY(-50%)',
    }
  },
  bottom: () => {
    return { bottom: 0 }
  },
}

const verticalToElement = {
  top: (element: DOMRect | null) => {
    return { top: element?.top ?? 0, transform: 'translateY(-100%)' }
  },
  center: () => {
    return {
      top: '50%',
      transform: 'translateY(-50%)',
    }
  },
  bottom: (element: DOMRect | null) => {
    return {
      bottom: element?.top ?? 0,
      transform: 'translateY(100%)',
    }
  },
}

export const verticalAlignment = (
  vertical: ModalProps['vertical'],
  relativeTo: ModalProps['relativeTo'],
  focusedElement: DOMRect | null
): verticalAlignmentReturnTypes => {
  switch (relativeTo) {
    case 'screen':
      return verticalToSreen[vertical]()

    case 'element':
      console.log(focusedElement)
      return verticalToElement[vertical](focusedElement)

    default:
      return verticalToSreen['center']()
  }
}
