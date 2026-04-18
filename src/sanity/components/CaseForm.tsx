'use client'

import { useEffect, useRef } from 'react'
import { ObjectInputProps, PatchEvent, unset } from 'sanity'

export function CaseForm(props: ObjectInputProps) {
  const { value, onChange, renderDefault } = props
  const prevMediaType = useRef(value?.mediaType as string | undefined)

  useEffect(() => {
    const current = value?.mediaType as string | undefined
    if (prevMediaType.current !== undefined && prevMediaType.current !== current) {
      if (current === 'image') {
        onChange(PatchEvent.from(unset(['videoId'])))
      } else if (current === 'video') {
        // image field removed — nothing to clear
      }
    }
    prevMediaType.current = current
  }, [value?.mediaType, onChange])

  return renderDefault(props)
}
