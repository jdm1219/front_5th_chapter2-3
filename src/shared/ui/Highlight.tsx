import React from "react"

interface HighlightProps {
  text: string
  highlight: string
}

export const Highlight: React.FC<HighlightProps> = ({ text, highlight }) => {
  if (!text) return <></>
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
    </span>
  )
}
