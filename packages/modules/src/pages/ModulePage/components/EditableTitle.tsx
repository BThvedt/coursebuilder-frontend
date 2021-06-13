import React, { FC, useState, useEffect, useContext } from "react"
import { TextField, Typography } from "@material-ui/core"
import { ModuleContext } from "../../../Context"
import { Variant } from "@material-ui/core/styles/createTypography"

interface IProps {
  editableTitle: string
  setEditableTitle: (title: string) => void
  variant: Variant
  inputClassName: string
}

const EditableTitle: FC<IProps> = ({
  editableTitle,
  setEditableTitle,
  variant,
  inputClassName
}) => {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState("")

  const { bodyClickCounter } = useContext(ModuleContext)

  useEffect(() => {
    setEditing(false)
  }, [bodyClickCounter])

  useEffect(
    () => {
      setTitle(editableTitle)
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setEditing(true)
      }}
    >
      {!editing && <Typography variant={variant}>{editableTitle}</Typography>}
      {editing && (
        <TextField
          onDragStart={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrag={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          multiline
          rowsMax={2}
          value={title}
          className={inputClassName}
          onChange={(e) => {
            //setPageTitle({ pageId: page.id, title: e.target.value });
            setEditableTitle(e.target.value)
            setTitle(e.target.value)
          }}
        />
      )}
    </div>
  )
}

export default EditableTitle
