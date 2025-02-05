import React from 'react'
import { Result, Typography } from 'antd'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title={
            <Typography.Title level={1} style={{ color: 'white' }}>
              Error
            </Typography.Title>
          }
          subTitle={
            <Typography.Text style={{ color: 'white' }}>
              Oops, something went wrong.
            </Typography.Text>
          }
        />
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
