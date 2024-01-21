import React from 'react'

export default function SelectComponent({ items, onChange, value, className, required}) {
  return (
    <select value={value} onChange={onChange} className={className} required={required}>
      <option value=""  >Sélectionnez une valeur</option>
      {items.map((item => {
        return <option key={item.value} value={item.value} >{item.title}</option>
      }))}
    </select>
  )
}
