import { ModalProps } from '../../Tour.utils'

type horizontalAlignmentReturnTypes =
  | { left: number; transform?: string }
  | { left: string; transform: string }
  | { right: number; transform?: string }

const horizontalToSreen = {
  left: () => {
    return { left: 0 }
  },
  center: () => {
    return {
      left: '50%',
      transform: 'translateX(-50%)',
    }
  },
  right: () => {
    return { right: 0 }
  },
}

const horizontalToElement = {
  left: (element: DOMRect | null) => {
    return { left: element?.left ?? 0, transform: 'translateX(-100%)' }
  },
  center: () => {
    return {
      left: '50%',
      transform: 'translateX(-50%)',
    }
  },
  right: (element: DOMRect | null) => {
    return {
      right: element?.left ?? 0,
      transform: 'translateX(100%)',
    }
  },
}

export const horizontalAlignment = (
  horizontal: ModalProps['horizontal'],
  relativeTo: ModalProps['relativeTo'],
  focusedElement: DOMRect | null
): horizontalAlignmentReturnTypes => {
  switch (relativeTo) {
    case 'screen':
      return horizontalToSreen[horizontal]()

    case 'element':
      return horizontalToElement[horizontal](focusedElement)

    default:
      return horizontalToSreen['center']()
  }
}
