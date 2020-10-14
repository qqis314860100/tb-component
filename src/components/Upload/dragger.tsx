import React, { FC, useState, DragEvent } from 'react'
import cls from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const klass = cls('tb-uploader-dragger', {
    'is-dragover': dragOver,
  })
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div
      className={klass}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
