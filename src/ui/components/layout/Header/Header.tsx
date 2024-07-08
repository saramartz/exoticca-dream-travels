'use client'
import logo from 'assets/images/logo.png'
import Button from 'components/common/Button/Button'
import CreateForm from 'components/features/CreateForm/CreateForm'
import Image from 'next/image'
import { useState } from 'react'
import styles from './header.module.scss'

const Header = () => {
    const [showCreate, setShowCreate] = useState(false)

    const handleCreate = () => setShowCreate(true)
    const handleCloseCreate = () => setShowCreate(false)

    return (
        <>
            <header className={styles.header}>
                <Image src={logo} alt="Company Logo" className={styles.logo} width={48} height={48} priority />
                <Button onClick={handleCreate} variant="secondary">
                    Create new trip
                </Button>
            </header>
            <CreateForm isOpen={showCreate} onClose={handleCloseCreate} />
        </>
    )
}

export default Header
