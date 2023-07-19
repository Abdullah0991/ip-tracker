import { Box, Card, CardBody, Container, Heading, Stack, StackDivider, Text, useMediaQuery } from '@chakra-ui/react'
import { useAppState } from '../app/StateContext';
import SearchInput from './SearchInput';
import bg from '../assets/images/pattern-bg-desktop.png';
import bgMobile from '../assets/images/pattern-bg-mobile.png';

const CardItem = ({ header, text }: { header: string, text?: string }) => {
  return (
    <Box w={['100%', '25%']} h={'100%'} display={['flex', 'unset']} flexDirection={['column', 'unset']} alignItems={'center'}>
      <Text pb='2' fontSize='xs' color={'dimgray'} fontWeight={'bold'}>
        {header}
      </Text>
      <Heading size='md' fontSize='xl' textTransform='uppercase' textAlign={['center', 'unset']}>
        {text}
      </Heading>
    </Box>
  )
}

const Header = () => {
  const { ipInfo: data } = useAppState();
  const [isMobile] = useMediaQuery('(max-width: 500px)');
  // Show dividers between the card items in normal view and hide in mobile view 
  const divider = isMobile ? <></> : <StackDivider />
  // Use the appropriate header bg image
  const bgImage = isMobile ? bgMobile : bg

  return (
    <Box bgImage={bgImage} bgRepeat={'round'} h={[320, 220]} position={'relative'}>
      <Container maxW='container.lg' h={'100%'} display={'flex'} alignItems={'center'} flexDirection={'column'} gap={'1rem'}>
        <Heading as='h3' size='lg' color={'white'} mt='1rem'>
          IP Address Tracker
        </Heading>
        <Box width={['90%', '50%']}>
          <SearchInput />
        </Box>
        <Card position={'absolute'} bottom={['-180px', '-70px']} left={['5%', '10%']} right={['5%', '10%']} zIndex={500} height={['360px', '140px']}>
          <CardBody>
            <Stack direction={['column', 'row']} divider={divider} spacing='1rem' justify={'center'} align={'center'} height={'100%'}>
              <CardItem header='IP Address' text={data?.ip} />
              <CardItem header='Location' text={data && `${data.location.city}, ${data.location?.region} ${data.location.postalCode}`} />
              <CardItem header='Timezone' text={data && `UTC ${data.location.timezone}`} />
              <CardItem header='ISP' text={data?.isp} />
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  )
}

export default Header
