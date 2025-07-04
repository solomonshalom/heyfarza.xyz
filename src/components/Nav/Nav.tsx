import * as React from 'react'
import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { Box, Flex, Container, NavLink as ThemeLink } from 'theme-ui'
import {
	BoxProps,
	NavLinkProps as ThemeNavLinkProps,
} from '@theme-ui/components'
import SkipNavLink from './SkipNavLink'
import Logo from './Logo'
import ColorModeToggle from './ColorModeToggle'

interface NavLinkProps extends ThemeNavLinkProps {
	href: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, ...props }) => (
	<NextLink href={href} passHref>
		<ThemeLink {...props} />
	</NextLink>
)

const Nav: React.FC<BoxProps> = ({ sx, ...props }) => {
	const { pathname } = useRouter()

	return (
		<Box
			as="nav"
			sx={{
				borderTop: 4,
				borderColor: 'primary',
				paddingTop: [4, null, 5],
				...sx,
			}}
			{...props}
		>
			<Container
				sx={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<SkipNavLink />

				<Logo />

				<Flex sx={{ alignItems: 'center' }}>
					<ColorModeToggle ml={[2, 3]} />
				</Flex>
			</Container>
		</Box>
	)
}

export default Nav
