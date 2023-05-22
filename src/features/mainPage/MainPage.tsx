import React, {useEffect, useState} from 'react';
import styles from './MainPage.module.scss'
import {Accordion, Box, Button, Group, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getAvatar, setPhoneAbonent} from "./green-reducer";
import {API_TOKEN_INSTANCE, ID_INSTANCE} from "../../common/enums/apiKey";
import ChatBlock from "../chatBlock/ChatBlock";

const MainPage = () => {
    const userIdInstance = ID_INSTANCE ? ID_INSTANCE : 'no data';
    const userApiTokenInstance = API_TOKEN_INSTANCE ? API_TOKEN_INSTANCE : 'no data';
    const [disabledData, setDisabledData] = useState(userIdInstance !== 'no data' && userApiTokenInstance !== 'no data')
    const phone = useAppSelector(state => state.green.phone);
    const dispatch = useAppDispatch();

    const form = useForm({
        initialValues: {
            idInstance: '',
            apiTokenInstance: '',
        },
        validate: {
            idInstance: (value) => {
                if (value.length !== 10) {
                    return 'Неверная длина idInstance (должно быть 10 символов).';
                }
                return null;
            },
            apiTokenInstance: (value) => {
                if (value.length !== 50) {
                    return 'Неверная длина apiTokenInstance (должно быть 50 символов).';
                }
                return null;
            },
        },
    });

    const form1 = useForm({
        initialValues: {
            phone: `${phone}`,
        },
        validate: {
            // Валидация на телефоны Республики Беларусь
            // phone: (value) => (/^375(29|33|44)\d{7}$/.test(value) ? null : 'Введите в формате 375ХХХХХХХХХ')
            phone: (value) => {
                if (value === '') {
                    return 'Сообщение не может быть пустым.';
                }
                return null;
            },
        }
    });

    const resetForm = () => {
        form.setValues({idInstance: '', apiTokenInstance: ''})
        window.location.reload();
    }

    const setNewPhone = () => {
        localStorage.setItem('phone', '');
        dispatch(setPhoneAbonent({}));
        window.location.reload();
    }
    const resetHandler = () => {
        localStorage.setItem('apiTokenInstance', '')
        localStorage.setItem('idInstance', '')
        setDisabledData(false)
        window.location.reload();
    }

    useEffect(() => {
        dispatch(setPhoneAbonent({}));
    }, [dispatch])

    return (
        <div className={styles.main}>
            <div style={{marginLeft: '15px'}}>
                <div className={styles.headerUserData}>
                    <div className={styles.userData}>
                        <div className={styles.userDataItem}>
                            Ваш idInstance: <span>{userIdInstance}</span>
                        </div>
                        <Button variant="subtle" radius="md" size="xs" compact onClick={resetHandler}>Выйти</Button>
                    </div>
                    <div className={styles.userDataItem}>Ваш apiTokenInstance: <span>{userApiTokenInstance}</span>
                    </div>
                </div>
                <Accordion className={styles.accordionBlock} radius="md"
                           defaultValue={disabledData ? 'flexibility' : 'customization'}>
                    <Accordion.Item value="customization">
                        <Accordion.Control disabled={disabledData}>Введите учетные данные из системы
                            GREEN-API</Accordion.Control>
                        <Accordion.Panel className={styles.accordionItem}>
                            <Box maw={440} mx="auto">
                                <form onSubmit={form.onSubmit((values) => {
                                    localStorage.setItem('apiTokenInstance', values.apiTokenInstance)
                                    localStorage.setItem('idInstance', values.idInstance)
                                    resetForm();
                                })}>
                                    <TextInput
                                        disabled={disabledData}
                                        withAsterisk
                                        label="idInstance"
                                        placeholder="Введите Ваш idInstance"
                                        {...form.getInputProps('idInstance')}
                                    />
                                    <TextInput
                                        disabled={disabledData}
                                        withAsterisk
                                        label="apiTokenInstance"
                                        placeholder="Введите Ваш apiTokenInstance"
                                        {...form.getInputProps('apiTokenInstance')}
                                    />
                                    <Group position="right" mt="md">
                                        <Button disabled={disabledData} type="submit" color="teal">Отправить</Button>
                                    </Group>
                                </form>
                            </Box>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="flexibility">
                        <Accordion.Control disabled={!disabledData}>Создание чата</Accordion.Control>
                        <Accordion.Panel>
                            <Box maw={440} mx="auto">
                                <form onSubmit={form1.onSubmit((values) => {
                                    localStorage.setItem('phone', values.phone);
                                    dispatch(setPhoneAbonent({}))
                                    dispatch(getAvatar({phone: values.phone}))
                                })}>
                                    <TextInput
                                        disabled={phone !== ''}
                                        withAsterisk
                                        label="Телефон"
                                        placeholder={!phone ? "Введите телефон абонента" : phone}
                                        {...form1.getInputProps('phone')}
                                    />
                                    <Group position="right" mt="md">
                                        <Button type="submit" color="teal" disabled={phone !== ''}>Отправить</Button>
                                        <Button color="teal" disabled={!phone} onClick={setNewPhone}>Сбросить</Button>
                                    </Group>
                                </form>
                            </Box>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>
            {phone && <ChatBlock/>}
        </div>
    );
};

export default MainPage;