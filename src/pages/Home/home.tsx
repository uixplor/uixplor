import Image from 'next/image';
import styles from './header.module.css';
import { Button } from '@/components/ui/button';
import ShadowCardGrid from '@/components/homepage/ShadowCardGrid';
import RocketIcon from '@/components/icons/RocketIcon';

export default function Home() {
	return (
		<>
			<main className={`main-border-around `}>
				<div className="container py-8 text-center justify-center">
					<h1 className="text-7xl font-bold gloock-regular">The Largest Library of <br />Open-Source UI</h1>
					<p className="text-center mt-5">Community-built library of UI elements. <br /> Copy as HTML/CSS, Tailwind, React and Figma.</p>

					<div className='flex justify-center mt-5'>
						<Button>
							<RocketIcon className="mr-2" />
							Browse all elements
						</Button>
					</div>

				</div>
				<Image src={'/images/bgs/bgStar.png'} width={200} height={100} className="w-full absolute top-0 left-0 -z-10" alt="" />
				{/* <ShadowCardGrid /> */}

			</main>
		</>
	);
}
