import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Lato, Roboto, Nunito, Inter, Fredoka, Varela_Round } from 'next/font/google';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'OctoDev',
	description:
		'OctoDev é uma aplicação web educacional voltada para o ensino de programação por meio de uma abordagem gamificada.',
	metadataBase: new URL('https://octodev.vercel.app'),
	keywords: ['programação', 'educação', 'gamificação', 'aprendizado', 'coding', "Intelligência Artificial", "IA", "tecnologia", "desenvolvimento", "software", "jogos educacionais"],
	authors: [{ name: 'Renan Rodrigues de Meneses' }, { name: 'Pedro Henrique Resende Gomes'}, { name: 'Gabriel Chagas Madureira' }],
	creator: 'OctoDev',
	publisher: 'OctoDev',
	applicationName: 'OctoDev',
	category: 'education',
	openGraph: {
		title: 'OctoDev',
		description:
			'OctoDev é uma aplicação web educacional voltada para o ensino de programação por meio de uma abordagem gamificada.',
		type: 'website',
		locale: 'pt_BR',
		url: 'https://octodev.vercel.app',
		siteName: 'OctoDev',
		images: [
			{
				url: '/favicon.png',
				width: 512,
				height: 512,
				alt: 'OctoDev',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'OctoDev',
		description:
			'OctoDev é uma aplicação web educacional voltada para o ensino de programação por meio de uma abordagem gamificada.',
		images: ['/favicon.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: '/',
	},
	verification: {
		google: 'aDOPi6ctOVGByWjhEwth9BDdeQOK3jO6KT2mGa09AQc',
	},
	icons: {
		icon: [
			{ url: '/favicon.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon.png', sizes: '192x192', type: 'image/png' },
			{ url: '/favicon.png', sizes: '512x512', type: 'image/png' },
		],
		shortcut: ['/favicon.png'],
		apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
	},
};
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--roboto' });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--lato' });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '800'], variable: '--nunito' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--inter' });
const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '600'], variable: '--fredoka' });
const varela = Varela_Round({ subsets: ['latin'], weight: ['400'], variable: '--varela' });

export const viewport: Viewport = {
	themeColor: 'black',
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	// Other viewport properties can be added here
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="pt-br"
			className={`${roboto.variable} ${lato.variable} ${nunito.variable} ${inter.variable} ${fredoka.variable} ${varela.variable}`}
		>
			<head />
			<body>
				<Providers>{children} </Providers>
			</body>
		</html>
	);
}
