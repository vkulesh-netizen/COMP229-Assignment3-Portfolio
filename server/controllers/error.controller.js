const getErrorMessage = (err) => {
  if (err?.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field'
    return `${field} already exists`
  }

  if (err?.errors) {
    const firstError = Object.values(err.errors)[0]
    return firstError?.message || 'Validation error'
  }

  return err?.message || 'An unexpected error occurred'
}

export default { getErrorMessage }
