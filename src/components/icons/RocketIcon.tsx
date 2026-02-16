'use client';

import { motion } from 'motion/react';

interface RocketIconProps {
	width?: number;
	height?: number;
	className?: string;
}

export default function RocketIcon({
	width = 25,
	height = 25,
	className = ''
}: RocketIconProps) {
	return (
		<motion.svg
			width={width}
			height={height}
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			initial={{ scale: 1, rotate: 0 }}
			whileHover={{
				scale: 1.1,
				rotate: -5,
				transition: {
					duration: 0.3,
					ease: "easeOut"
				}
			}}
			animate={{
				y: [0, -3, 0],
				transition: {
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}}
		>
			<g clipPath="url(#clip0_155_36)">
				<motion.path
					d="M5.58029 18.6781C3.77339 17.0342 2.63601 14.7818 2.38572 12.3518C2.13543 9.92182 2.78981 7.48486 4.22367 5.50711C5.65753 3.52936 7.77022 2.14967 10.1576 1.63197C12.5449 1.11426 15.0393 1.4949 17.1636 2.70105M2.098 18.6073C0.836541 20.8177 0.413624 22.5333 1.12612 23.2469C2.20842 24.3281 5.59279 22.799 9.51258 19.6917M13.999 18.9063L10.2751 15.1823L18.5522 6.90522C19.2275 6.23054 20.0737 5.75234 21.0001 5.52189L23.1282 4.98751C23.2752 4.9509 23.4291 4.95291 23.575 4.99336C23.721 5.03381 23.854 5.11132 23.9611 5.21835C24.0683 5.32539 24.1459 5.45832 24.1865 5.60423C24.2271 5.75014 24.2293 5.90406 24.1928 6.05105L23.6605 8.18126C23.4293 9.10749 22.9504 9.95333 22.2751 10.6281L13.999 18.9063Z"
					stroke="#B8FB3C"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{
						pathLength: 1,
						opacity: 1,
						transition: {
							duration: 1.5,
							ease: "easeInOut"
						}
					}}
				/>
				<motion.path
					d="M10.2752 15.1823L7.22518 14.1667C7.15384 14.1431 7.08974 14.1016 7.03899 14.0462C6.98824 13.9908 6.95255 13.9233 6.93531 13.8502C6.91807 13.777 6.91987 13.7007 6.94052 13.6285C6.96118 13.5562 7.00001 13.4905 7.05331 13.4375L8.11581 12.375C8.57813 11.9129 9.15997 11.5887 9.79615 11.4385C10.4323 11.2884 11.0978 11.3184 11.7179 11.525L13.3825 12.0781L10.2752 15.1823ZM13.9991 18.9063L15.0158 21.9573C15.039 22.0288 15.0802 22.0932 15.1355 22.1441C15.1908 22.1951 15.2583 22.2309 15.3315 22.2482C15.4047 22.2655 15.4811 22.2636 15.5533 22.2428C15.6256 22.2219 15.6912 22.1828 15.7439 22.1292L16.8064 21.0656C17.2683 20.6034 17.5925 20.0218 17.7426 19.3858C17.8927 18.7498 17.8629 18.0846 17.6564 17.4646L17.1033 15.8L13.9991 18.9063Z"
					stroke="#B8FB3C"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{
						pathLength: 1,
						opacity: 1,
						transition: {
							duration: 1.5,
							delay: 0.3,
							ease: "easeInOut"
						}
					}}
				/>
			</g>
			<defs>
				<clipPath id="clip0_155_36">
					<rect width="25" height="25" fill="white" />
				</clipPath>
			</defs>
		</motion.svg>
	);
}
