'use client'
import logo from 'assets/images/logo.png'
import Button from 'components/common/Button/Button'
import CreateForm from 'components/features/CreateForm/CreateForm'
import { useTripsContext } from 'contexts/TripsContext'
import Image from 'next/image'
import styles from './header.module.scss'

const Header = () => {
    const { create } = useTripsContext()

    return (
        <>
            <header className={styles.header}>
                <Image src={logo} alt="Company Logo" className={styles.logo} width={48} height={48} priority />
                <Button onClick={create.handleOpenCreate} variant="secondary">
                    Create new trip
                </Button>
            </header>
            <CreateForm isOpen={create.showCreate} onClose={create.handleCloseCreate} />
        </>
    )
}

export default Header
