'use client'
import Button from 'components/common/Button/Button'
import { logger } from 'infrastructure/api/logger'
import { useEffect } from 'react'
import styles from './error.module.scss'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    useEffect(() => {
        logger.error(`Page Error: ${error}`)
    }, [error])

    return (
        <div className={styles.container}>
            <h2>Something went wrong!</h2>
            <Button variant="primary" onClick={() => reset()}>
                Try again
            </Button>
        </div>
    )
}

export default Error
