import { ModalProps } from '../../Tour.utils'
import { horizontalAlignment } from './horizontalAlignment'
import { verticalAlignment } from './verticalAlignment'

type GeneratePositionProps = {
  horizontal: ModalProps['horizontal']
  vertical: ModalProps['vertical']
  relativeTo: ModalProps['relativeTo']
  focusedElement: DOMRect | null
}

export const generatePosition = ({
  horizontal,
  vertical,
  relativeTo,
  focusedElement,
}: GeneratePositionProps) => {
  const horizontalAlignmentResult = horizontalAlignment(
    horizontal,
    relativeTo,
    focusedElement
  )
  const verticalAlignmentResult = verticalAlignment(
    vertical,
    relativeTo,
    focusedElement
  )

  return {
    ...horizontalAlignmentResult,
    ...verticalAlignmentResult,
    transform: `${horizontalAlignmentResult.transform ?? ''} 
    ${verticalAlignmentResult.transform ?? ''}`,
  }
}
