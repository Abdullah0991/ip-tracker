import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { CircularProgress, FormControl, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { getIPInfo } from '../app/api';
import arrowIcon from '../assets/images/icon-arrow.svg';
import { useAppState } from '../app/StateContext';

const SearchInput = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [searching, setSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { ipInfo: data, setIPInfo } = useAppState();
    const toast = useToast()

    useEffect(() => {
        // Set the ip address to the client's one only at the start
        if (data && !userInput) {
            setUserInput(data.ip)
        }
    }, [data]);

    const submit = (evt: SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault();
        // Search for the user query
        setSearching(true)
        getIPInfo(inputRef.current?.value)
            .then((info) => {
                console.log(info)
                // Dispatch the response to app context
                setIPInfo(info)
            })
            .catch(err => {
                console.error(err);
                // Show error toast
                toast({
                    title: 'Error',
                    description: err.message || err.status,
                    status: 'error'
                })
            })
            .finally(() => setSearching(false))
    }

    return (
        <form onSubmit={submit}>
            <FormControl>
                <InputGroup size='lg'>
                    <Input name='search' placeholder='Search for any IP address or domain'
                           bg={'white'} value={userInput}
                           onChange={(e) => setUserInput(e.target.value)} ref={inputRef} />
                    <InputRightElement children={<SubmitBtn onClick={submit} loading={searching} />}
                                       bgColor={'black'} color={'white'}
                                       borderRadius='0 6px 6px 0' />
                </InputGroup>
            </FormControl>
        </form>
    )
}

const SubmitBtn = ({ onClick, loading }: { onClick: (e: never) => void, loading: boolean }) => {
    return (
        <div className='search-submit-btn' onClick={onClick}>
            {
                loading ?
                    <CircularProgress size={'32px'} isIndeterminate /> :
                    <img src={arrowIcon} style={{ width: '12px', height: '12px' }} alt='arrow' />
            }
        </div>
    )
}

export default SearchInput
