import Image from 'next/image';
import styles from './header.module.css';
import { Button } from '@/components/ui/button';

export default function Header() {
    return (
        <>
            {/* <header>
                <div className="relative w-full flex justify-center">
                    <div className='flex w-full items-center justify-evenly absolute top-0 left-0 p-5 z-20'>
                        <div>
                            <Image
                                className="relative  "
                                src={mainLogo}
                                alt="UIXplore Logo"
                                width={243}
                                height={20}
                            />
                        </div>
                        <div>
                            Main
                        </div>
                    </div>
                    <Image
                        className="relative z-10 w-full "
                        src={logo}
                        alt="UIXplore Logo"
                        priority
                        width={1440}
                        height={118}
                    />
                    <div
                        className={`${styles['svg-bg']} position-absolute
                        -z-10
      absolute
      top-[-40%]
      left-1/2
      -translate-x-1/2
      w-[100%]
      h-[400px]
      bg-gradient-to-b
      from-[#CC97F4]
      via-[#722BFF]
      to-transparent
      blur-[160px]
      opacity-70
      pointer-events-none
        `}
                    />
                </div>
            </header > */}


            <header>
                <div className={`${styles['svg-bg']} position-absolute -z-10 absolute top-[-40%] left-1/2 -translate-x-1/2 w-full h-[700px] bg-linear-to-b from-[#CC97F4] via-[#722BFF] to-transparent blur-[160px] opacity-70 pointer-events-none`} />
                <Image src={'/images/bgs/UIXPLOOR.svg'} width={200} height={100} className="w-full absolute top-0 left-0 -z-9" alt="" />

                <div className="container py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Image src={'/images/uixplore-logo.svg'} width={200} height={100} alt="" />
                        </div>
                        <div>
                            <Button>Main</Button>
                        </div>
                    </div>
                </div>
            </header>



            {/* <header className="header fixed w-full z-50"> */}
            {/* <div className="container">
                    <div className="navigation relative flex items-center justify-center">
                        <div className={`logo text-3xl inline-block px-10 py-6 bg-[#19212b] rounded-b-2xl before:content-[''] before:h-10 before:w-20 before:bg-transparent
                        before:shadow-[40px_0_0_#19212b] before:absolute before:z-10 before:right-full before:top-0 before:rounded-tr-full after:content-[''] after:h-10 after:w-20 after:bg-transparent
                        after:shadow-[-40px_0_0_#19212b] after:absolute after:z-10 after:left-full after:top-0 after:rounded-tl-full relative border-b-primary border-b`}>
                            <Image src={logo} className="max-h-[25px] w-auto" alt="" />
                        </div> */}

            {/* <button className="menu-btn absolute top-1/2 -translate-y-1/2 right-0 pl-4 pr-2 py-2 border rounded-full border-primary flex items-center gap-2 cursor-pointer font-semibold">
                            MENU
                            <div className="h-8 w-8 flex items-center justify-center bg-primary text-secondary rounded-full">
                                <Hamburger/>
                            </div>
                        // </button> */}
            {/* </div> */}
            {/* // </div> */}
            {/* // </header> */}

            {/* <motion.div animate={{
                translateY: '100%',
            }} className="navigation-dropdown h-full w-full bg-[#131921] fixed left-0 z-20 top-0">
                header dropdown
            </motion.div> */}
        </>
    );
}
