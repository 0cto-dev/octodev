import LayoutWithNav from '@/components/LayoutWithNav/LayoutWithNav';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LayoutWithNav>
			{children}
		</LayoutWithNav>
	);
}
