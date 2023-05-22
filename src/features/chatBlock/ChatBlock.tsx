import React, {useEffect, useState} from 'react';
import styles from "../mainPage/MainPage.module.scss";
import ChatHistory from "./chatHistory/ChatHistory";
import {Button, Group, Textarea} from "@mantine/core";
import {getChatHistory, setMessageWhat} from "../mainPage/green-reducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useForm} from "@mantine/form";
import avatar from '../../assets/images/noPhoto.png'

const ChatBlock = () => {
    const dispatch = useAppDispatch();
    const phone = useAppSelector(state => state.green.phone);
    const [reset, setReset] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const urlPhoto = useAppSelector(state => state.green.avatar);

    const form = useForm({
        initialValues: {
            message: '',
        },
        validate: {
            message: (value) => {
                if (value === '') {
                    return 'Сообщение не может быть пустым.';
                }
                return null;
            },
        }
    });

    useEffect(() => {
        setReset(false)
        dispatch(getChatHistory({phone}))
    }, [])

    return (
        <div style={{marginRight: '15px'}}>
            <div className={styles.chatBlock}>
                <div className={styles.headerMessage}>
                    <img src={urlPhoto || avatar} style={{width: '50px', borderRadius: '50%', marginRight: '10px'}}
                         alt=""/>
                    {phone}
                </div>
                <div id={'chatMessage'} className={styles.chatMessage}>
                    <ChatHistory reset={reset}/>
                </div>
                <form onSubmit={form.onSubmit((values) => {
                    dispatch(setMessageWhat({phone, message: form.values.message}))
                    setDisabled(true)
                    setTimeout(() => {
                        dispatch(getChatHistory({phone}))
                        form.setValues({message: ''})
                        setReset(!reset)
                        setDisabled(false)
                    }, 3000)
                    const container = document.querySelector('#chatMessage');
                    if (container) container.scrollTop = container.scrollHeight;
                })}>
                    <Group className={styles.sendMessage} position="apart" spacing="xs">
                        <Textarea
                            disabled={disabled}
                            className={styles.textMessage}
                            placeholder="Сообщение"
                            radius="xl"
                            minRows={1}
                            maxRows={4}
                            {...form.getInputProps('message')}
                        />
                        <Button type="submit" color="teal" disabled={disabled}>Отправить</Button>
                    </Group>
                </form>
            </div>
        </div>
    );
};

export default ChatBlock;

