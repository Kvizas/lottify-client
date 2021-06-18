import React, { useState } from 'react'
import Modal from '../modal/modal'
import RegisterModal from './register-modal'
import LoginModal from "./login-modal"

export default function AuthModal(props) {

    const [opened, setOpened] = useState(false)
    const [register, setRegister] = useState(props.register)

    const open = () => {
        setOpened(true);
    }

    props.myRef.current.open = open;

    return (
        <Modal opened={opened} close={() => setOpened(false)}>
            {register ?
                <RegisterModal openLogin={() => setRegister(false)} close={() => setOpened(false)}></RegisterModal>
                :
                <LoginModal openRegister={() => setRegister(true)} close={() => setOpened(false)}></LoginModal>}
        </Modal>
    )
}
