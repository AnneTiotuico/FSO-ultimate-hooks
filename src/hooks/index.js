import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    (async() => {
      const result = await fetch(baseUrl)
      const data = await result.json()
      setResources(data)
    })()
  }, [baseUrl])

  const create = async (resource) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resource)
    })
  
    if (response.ok) {
      let result = await response.json()
      setResources(resources.concat(result))
      return result
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}