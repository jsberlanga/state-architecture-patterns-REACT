import React from 'react'

const ErrorHandler = ({ error }) => {
  const cssStyles = []

  if (error) {
    cssStyles.push('error')
  }
    return (
      <div className={cssStyles}>
        {error}
      </div>
    )
}

export default ErrorHandler;
