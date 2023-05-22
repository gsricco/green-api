import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import styles from './ChatHistory.module.scss'
import {getChatHistory} from "../../mainPage/green-reducer";

const ChatHistory = ({reset}: PropsType) => {
    const chatHistory = useAppSelector(state => state.green.chatHistory)
    const dispatch = useAppDispatch();
    const phone = useAppSelector(state => state.green.phone)
    const container = document.querySelector('#chatMessage');
    if (container) container.scrollTop = container.scrollHeight;

    useEffect(() => {
        const fetchChatHistory = () => {
            dispatch(getChatHistory({phone}));
        };
        const interval = setInterval(fetchChatHistory, 10000);
        return () => {
            clearInterval(interval);
        };
        dispatch(getChatHistory({phone}));
    }, [reset])

    return (
        <div className={styles.chatMap}>
            {
                chatHistory.map((ch, index) => (
                    <div key={index}
                         className={ch.type === 'incoming' ? styles.chatMapItemLeft : styles.chatMapItemRight}>
                        {ch.textMessage}
                    </div>
                ))
            }
        </div>
    );
};

export default ChatHistory;

type PropsType = {
    reset: boolean
}